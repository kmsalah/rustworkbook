#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

# Open the original image
img = Image.open('attached_assets/image_1763331625238.png')

# Convert to RGBA if not already
if img.mode != 'RGBA':
    img = img.convert('RGBA')

# Convert to numpy array for color manipulation
img_array = np.array(img)

# Separate the channels
r, g, b, a = img_array[:,:,0], img_array[:,:,1], img_array[:,:,2], img_array[:,:,3]

# Find pixels that are green-ish (where green channel is dominant)
green_mask = (g > 100) & (g > r * 1.2) & (g > b * 1.2) & (a > 0)

# Define burgundy color
burgundy_r, burgundy_g, burgundy_b = 139, 26, 50

# Replace green pixels with burgundy
for y in range(img_array.shape[0]):
    for x in range(img_array.shape[1]):
        if green_mask[y, x]:
            brightness = g[y, x] / 255.0
            img_array[y, x, 0] = int(burgundy_r * brightness * 1.2)
            img_array[y, x, 1] = int(burgundy_g * brightness)
            img_array[y, x, 2] = int(burgundy_b * brightness)

# Convert back to PIL Image
new_img = Image.fromarray(img_array, 'RGBA')

# Apply a dilation filter to make lines thicker
# This will expand the colored areas slightly
new_img = new_img.filter(ImageFilter.MaxFilter(3))

# Get the bounding box of non-transparent pixels
bbox = new_img.getbbox()

if bbox:
    # Crop even tighter to the content (more aggressive cropping)
    x1, y1, x2, y2 = bbox
    width = x2 - x1
    height = y2 - y1
    
    # Calculate additional crop to zoom in even more
    # Crop 15% from each side to make it bigger
    crop_amount = 0.15
    new_x1 = x1 + int(width * crop_amount)
    new_y1 = y1 + int(height * crop_amount)
    new_x2 = x2 - int(width * crop_amount)
    new_y2 = y2 - int(height * crop_amount)
    
    # Ensure we don't crop too much
    if new_x2 > new_x1 and new_y2 > new_y1:
        img_cropped = new_img.crop((new_x1, new_y1, new_x2, new_y2))
    else:
        img_cropped = new_img.crop(bbox)
    
    # Create the final favicon with very minimal padding
    crop_width, crop_height = img_cropped.size
    padding = 5  # Minimal padding
    
    # Create new square image
    new_size = max(crop_width + padding * 2, crop_height + padding * 2)
    final_img = Image.new('RGBA', (new_size, new_size), (0, 0, 0, 0))
    
    # Center the cropped image
    x = (new_size - crop_width) // 2
    y = (new_size - crop_height) // 2
    final_img.paste(img_cropped, (x, y))
    
    # Apply another slight dilation to thicken lines after scaling
    final_img = final_img.filter(ImageFilter.MaxFilter(2))
    
    # Scale to favicon size
    favicon = final_img.resize((256, 256), Image.Resampling.LANCZOS)
    
    # Apply a final sharpening to enhance edges
    favicon = favicon.filter(ImageFilter.SHARPEN)
else:
    favicon = new_img.resize((256, 256), Image.Resampling.LANCZOS)

# Save the enhanced burgundy favicon
favicon.save('client/public/favicon.png', 'PNG')
print("✅ Favicon enhanced with:")
print("   - Even larger crab (more aggressive cropping)")
print("   - Thicker lines (dilation filter applied)")
print("   - Burgundy color maintained")
print("   - Sharpened edges for clarity")