import json

with open('/Users/yeswanth/Documents/Projects/Solicate-Works/stillness/wordpress/home-templates-v1/template-shop-v1.json', 'r') as f:
    data = json.load(f)

# Find shop_inner container
shop_inner = data["content"][0]["elements"][0]
if shop_inner["id"] == "shop_inner":
    # Add CSS class
    shop_inner["settings"]["css_classes"] = "stillness-dynamic-grid-container"
    
    # We want to replace shop_grid with shortcode and custom HTML for styles
    # Let's find index of shop_grid
    grid_index = -1
    for i, el in enumerate(shop_inner["elements"]):
        if el["id"] == "shop_grid":
            grid_index = i
            break
            
    if grid_index != -1:
        # Create Shortcode Widget
        shortcode_widget = {
            "id": "shop_woocommerce_grid_shortcode",
            "elType": "widget",
            "settings": {
                "shortcode": "[products limit='3' columns='3' orderby='date' order='DESC']"
            },
            "widgetType": "shortcode"
        }
        
        # Create Style/Mobile Button HTML Widget
        css = """/* Skinning standard WooCommerce output */ 
.stillness-dynamic-grid-container ul.products { display: grid !important; grid-template-columns: repeat(3, 1fr) !important; gap: 48px !important; list-style: none !important; padding: 0 !important; margin: 0 !important; } 
.stillness-dynamic-grid-container ul.products::before, .stillness-dynamic-grid-container ul.products::after { content: none !important; } 
@media (max-width: 768px) { .stillness-dynamic-grid-container ul.products { grid-template-columns: 1fr !important; gap: 32px !important; } } 
.stillness-dynamic-grid-container li.product { display: flex !important; flex-direction: column !important; width: 100% !important; float: none !important; margin: 0 !important; position: relative !important; cursor: pointer; list-style-type: none !important; background: transparent !important; } 
.stillness-dynamic-grid-container li.product a.woocommerce-LoopProduct-link { display: flex !important; flex-direction: column !important; text-decoration: none !important; color: inherit !important; } 
.stillness-dynamic-grid-container li.product img { width: 100% !important; aspect-ratio: 3/4 !important; object-fit: cover !important; border-radius: 16px !important; transition: transform 1s ease-out !important; margin-bottom: 24px !important; background: rgba(196, 187, 180, 0.2) !important; box-shadow: none !important; } 
.stillness-dynamic-grid-container li.product:hover img { transform: scale(1.05) !important; } 
.stillness-dynamic-grid-container li.product .woocommerce-loop-product__title { font-family: 'Cormorant Garamond', serif !important; font-size: 20px !important; color: #0E1B30 !important; margin: 0 0 4px 0 !important; transition: color 0.3s ease !important; order: 1; padding: 0 !important; background: none !important; } 
.stillness-dynamic-grid-container li.product:hover .woocommerce-loop-product__title { color: #688F9D !important; } 
/* Subtext (if any) could be targeted here */ 
.stillness-dynamic-grid-container li.product .price { font-family: 'Lato', sans-serif !important; font-weight: 700 !important; color: #688F9D !important; font-size: 16px !important; margin-bottom: 0 !important; order: 2; display: block !important; transition: color 0.3s ease !important; background: none !important; padding: 0 !important; } 
.stillness-dynamic-grid-container li.product:hover .price { color: #0E1B30 !important; } 
.stillness-dynamic-grid-container li.product .button.add_to_cart_button, .stillness-dynamic-grid-container li.product .button.product_type_simple { position: absolute !important; bottom: 16px !important; right: 16px !important; background: #688F9D !important; border: none !important; padding: 8px 16px !important; border-radius: 99px !important; opacity: 0 !important; transform: translateY(16px) !important; transition: all 0.5s ease !important; z-index: 20 !important; cursor: pointer !important; box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important; font-size: 0 !important; color: transparent !important; line-height: 1 !important; float: none !important; width: auto !important; height: auto !important; margin: 0 !important; color: transparent !important; } 
.stillness-dynamic-grid-container li.product .button.add_to_cart_button::before, .stillness-dynamic-grid-container li.product .button.product_type_simple::before { content: 'VIEW' !important; font-family: 'Lato', sans-serif !important; font-size: 10px !important; text-transform: uppercase !important; letter-spacing: 1px !important; color: #fff !important; line-height: 1 !important; } 
.stillness-dynamic-grid-container li.product:hover .button.add_to_cart_button, .stillness-dynamic-grid-container li.product:hover .button.product_type_simple { opacity: 1 !important; transform: translateY(0) !important; } 
.stillness-dynamic-grid-container .woocommerce-placeholder { display: none !important; } 
.stillness-dynamic-grid-container .woocommerce-product-rating { display: none !important; } 
.mobile-btn-wrap { display: none; text-align: center; margin-top: 48px; } @media (max-width: 768px) { .mobile-btn-wrap { display: block; } } 
.mobile-btn { display: inline-block; padding: 12px 32px; border: 1px solid rgba(14, 27, 48, 0.2); border-radius: 99px; color: #0E1B30; text-decoration: none; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; }"""
        
        html_widget = {
            "id": "shop_styles_html",
            "elType": "widget",
            "settings": {
                "html": f"<div class='mobile-btn-wrap'><a href='/shop' class='mobile-btn'>View Shop</a></div><style>{css}</style>"
            },
            "widgetType": "html"
        }
        
        # Replace
        shop_inner["elements"].pop(grid_index)
        shop_inner["elements"].insert(grid_index, html_widget)
        shop_inner["elements"].insert(grid_index, shortcode_widget)

with open('/Users/yeswanth/Documents/Projects/Solicate-Works/stillness/wordpress/home-templates-v1/template-shop-v1.json', 'w') as f:
    json.dump(data, f, indent=2)

print("Done")
