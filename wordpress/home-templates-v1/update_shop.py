
import json
import os

def generate_shop_v2():
    html_content = """<div class="shop-grid-wrapper">
    <div class="shop-card" onclick="window.location.href='/shop'">
        <div class="icon-wrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
        </div>
        <h3>Mini Moments</h3>
        <p>40 grounding affirmation cards for the moments when you need one small shift to come back to yourself.</p>
        <a href="/shop" class="card-link">SHOP <i class="fas fa-arrow-right"></i></a>
    </div>
    <div class="shop-card" onclick="window.location.href='/shop'">
        <div class="icon-wrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <h3>In This Little Life</h3>
        <p>A card deck for parents to answer to their children. Your words become their inner voice — make them count.</p>
        <a href="/shop" class="card-link">SHOP <i class="fas fa-arrow-right"></i></a>
    </div>
    <div class="shop-card" onclick="window.location.href='/shop'">
        <div class="icon-wrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
        </div>
        <h3>Astrology Report</h3>
        <p>A 100+ page personalised birth chart report — your emotional blueprint, life path, and tools for alignment.</p>
        <a href="/shop" class="card-link">SHOP <i class="fas fa-arrow-right"></i></a>
    </div>
    <div class="shop-card" onclick="window.location.href='/shop'">
        <div class="icon-wrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
        </div>
        <h3>Love, Eventually</h3>
        <p>A digital self-love journal that arrives already filled — so you don't have to start from empty.</p>
        <a href="/shop" class="card-link">SHOP <i class="fas fa-arrow-right"></i></a>
    </div>
</div>
<style>
.shop-grid-wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    width: 100%;
}
@media (max-width: 1024px) {
    .shop-grid-wrapper { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 767px) {
    .shop-grid-wrapper { grid-template-columns: 1fr; }
}
.shop-card {
    background: #FFFFFF;
    border: 1px solid rgba(14, 27, 48, 0.05);
    padding: 56px 40px;
    border-radius: 24px;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
}
.shop-card:hover {
    background: #0E1B30;
    border-color: #0E1B30;
    box-shadow: 0 30px 60px rgba(14, 27, 48, 0.2);
    transform: translateY(-8px);
}
.icon-wrap {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 1px solid #688F9D;
    color: #688F9D;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 32px;
    transition: all 0.5s ease;
    flex-shrink: 0;
}
.shop-card:hover .icon-wrap {
    background: #688F9D;
    color: #FFFFFF;
    border-color: #688F9D;
}
.shop-card h3 {
    font-family: "Cormorant Garamond", serif;
    font-size: 26px;
    color: #0E1B30;
    margin-bottom: 16px;
    font-weight: 500;
    line-height: 1.2;
    transition: color 0.5s ease;
}
.shop-card:hover h3 {
    color: #FFFFFF;
}
.shop-card p {
    font-family: "Lato", sans-serif;
    font-weight: 300;
    font-size: 15px;
    color: rgba(14, 27, 48, 0.6);
    line-height: 1.7;
    margin: 0 0 40px 0;
    transition: color 0.5s ease;
    flex-grow: 1;
}
.shop-card:hover p {
    color: rgba(255, 255, 255, 0.85);
}
.card-link {
    background: #688F9D;
    color: #FFFFFF;
    padding: 14px 32px;
    border-radius: 100px;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-family: "Lato", sans-serif;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid transparent;
}
.shop-card:hover .card-link {
    background: #FFFFFF;
    color: #688F9D;
    transform: scale(1.02);
}
.card-link i {
    transition: transform 0.3s ease;
    font-size: 14px;
}
.shop-card:hover .card-link i {
    transform: translateX(6px);
}
</style>"""

    data = {
        "content": [
            {
                "id": "shop_section_v2",
                "elType": "container",
                "settings": {
                    "content_width": "full",
                    "background_background": "classic",
                    "background_color": "#FFFFFF",
                    "padding": {
                        "unit": "px",
                        "top": "120",
                        "right": "40",
                        "bottom": "120",
                        "left": "40",
                        "isLinked": False
                    }
                },
                "elements": [
                    {
                        "id": "shop_inner_v2",
                        "elType": "container",
                        "settings": {
                            "content_width": "boxed",
                            "boxed_width": {
                                "unit": "px",
                                "size": 1140
                            },
                            "flex_direction": "column"
                        },
                        "elements": [
                            {
                                "id": "shop_header_v2",
                                "elType": "container",
                                "settings": {
                                    "content_width": "full",
                                    "flex_direction": "row",
                                    "flex_justify_content": "space-between",
                                    "flex_align_items": "flex-end",
                                    "margin": {
                                        "unit": "px",
                                        "bottom": "64",
                                        "isLinked": False
                                    }
                                },
                                "elements": [
                                    {
                                        "id": "shop_title_col_v2",
                                        "elType": "container",
                                        "settings": {
                                            "width": {
                                                "unit": "%",
                                                "size": "65"
                                            }
                                        },
                                        "elements": [
                                            {
                                                "id": "shop_h2_v2",
                                                "elType": "widget",
                                                "settings": {
                                                    "title": "Bring The Ritual Home",
                                                    "typography_typography": "custom",
                                                    "typography_font_family": "Cormorant Garamond",
                                                    "typography_font_size": {
                                                        "unit": "px",
                                                        "size": 48
                                                    },
                                                    "title_color": "#0E1B30",
                                                    "margin": {
                                                        "unit": "px",
                                                        "bottom": "16",
                                                        "isLinked": False
                                                    }
                                                },
                                                "widgetType": "heading"
                                            },
                                            {
                                                "id": "shop_p_v2",
                                                "elType": "widget",
                                                "settings": {
                                                    "editor": "<p style=\"font-family: 'Lato', sans-serif; font-size: 16px; color: rgba(14, 27, 48, 0.6); max-width: 450px;\">Tools and elements to maintain your nervous system regulation between sessions.</p>"
                                                },
                                                "widgetType": "text-editor"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "shop_link_col_v2",
                                        "elType": "container",
                                        "settings": {
                                            "width": {
                                                "unit": "%",
                                                "size": "30"
                                            },
                                            "flex_align_items": "flex-end",
                                            "flex_justify_content": "flex-end"
                                        },
                                        "elements": [
                                            {
                                                "id": "shop_view_all_fixed_v2",
                                                "elType": "widget",
                                                "settings": {
                                                    "html": "<div class='shop-view-all-wrapper hidden-mobile'><div style='text-align: right;'><a href='/shop' class='shop-view-all-link'>View All <i class='fas fa-arrow-right'></i></a></div></div><style>.shop-view-all-link { display: inline-flex; align-items: center; gap: 12px; font-family: 'Lato', sans-serif; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; color: #0E1B30; text-decoration: none; transition: color 0.3s ease; } .shop-view-all-link:hover { color: #688F9D; } .shop-view-all-link i { transition: transform 0.3s ease; } .shop-view-all-link:hover i { transform: translateX(4px); } @media (max-width: 767px) { .hidden-mobile { display: none; } }</style>"
                                                },
                                                "widgetType": "html"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "id": "shop_grid_v2",
                                "elType": "widget",
                                "settings": {
                                    "html": html_content
                                },
                                "widgetType": "html"
                            }
                        ]
                    }
                ]
            }
        ],
        "page_settings": [],
        "version": "0.4",
        "title": "Stillness Shop Preview V2",
        "type": "section"
    }
    
    output_path = '/Users/yeswanth/Documents/Projects/Solicate-Works/stillness/wordpress/home-templates-v1/template-shop-v2.json'
    with open(output_path, 'w') as f:
        json.dump(data, f, indent=4)
    print(f"Generated {output_path}")

if __name__ == "__main__":
    generate_shop_v2()
