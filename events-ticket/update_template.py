import json

file_path = '/Users/yswnth/Documents/Projects/stillness/events-ticket/single-product-templates/template-single-event-04-content-booking.json'

with open(file_path, 'r') as f:
    data = json.load(f)

# The HTML is located in data['content'][0]['elements'][0]['settings']['html']
html_content = data['content'][0]['elements'][0]['settings']['html']

# 1. Update .se-booking-card padding and gap
html_content = html_content.replace(
    "padding: 32px !important;", 
    "padding: 36px !important;"
)
html_content = html_content.replace(
    "gap: 24px !important;\n  box-shadow: 0 16px 40px rgba(14,27,48,0.06)", 
    "gap: 28px !important;\n  box-shadow: 0 16px 40px rgba(14,27,48,0.06)"
)

# 2. Update .se-card-title
html_content = html_content.replace(
    "font-size: 21px !important;", 
    "font-size: 22px !important;\n  letter-spacing: 0.01em !important;"
)

# 3. Update .se-card-price
html_content = html_content.replace(
    "font-size: 24px !important;", 
    "font-size: 26px !important;\n  margin-top: 4px !important;"
)

# 4. Update .se-card-details padding
html_content = html_content.replace(
    "padding: 16px 0 !important;", 
    "padding: 20px 0 !important;"
)
html_content = html_content.replace(
    "gap: 10px !important;\n  padding: 20px 0 !important;", 
    "gap: 12px !important;\n  padding: 20px 0 !important;"
)

# 5. Update .se-card-detail gap
html_content = html_content.replace(
    "gap: 10px !important;\n  font-family: 'Jost', sans-serif !important;\n  font-size: 11.5px !important;", 
    "gap: 12px !important;\n  font-family: 'Jost', sans-serif !important;\n  font-size: 11.5px !important;"
)

# 6. Update Form cart styling
form_cart_old = """
.se-card-form form.cart {
  display: flex !important;
  flex-direction: column !important;
  gap: 12px !important;
  margin: 0 !important;
}
.se-card-form .quantity input.qty {
  display: none !important;
}
.se-card-form form.cart .quantity::before {
  content: none !important;
}
"""

form_cart_new = """
.se-card-form form.cart {
  display: flex !important;
  flex-direction: column !important;
  gap: 12px !important;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  background: none !important;
}
/* Hide default WC stock text */
.se-card-form .stock,
.se-card-form .in-stock,
.se-card-form .out-of-stock,
.se-card-form .availability,
.se-booking-card p.stock {
  display: none !important;
}
/* Quantity Selector Styled like Prototype */
.booking-qty-wrapper { display: flex !important; flex-direction: column !important; gap: 8px !important; }
.qty-label { font-size: 9px !important; letter-spacing: 0.15em !important; text-transform: uppercase !important; color: #7A8F96 !important; font-weight: 500 !important; font-family: 'Jost', sans-serif !important; }
.qty-selectors { display: flex !important; border: 0.5px solid rgba(14,27,48,0.15) !important; border-radius: 2px !important; overflow: hidden !important; width: 120px !important; height: 40px !important; }
.qty-btn { width: 40px !important; border: none !important; background: transparent !important; color: #0E1B30 !important; cursor: pointer !important; display: flex !important; align-items: center !important; justify-content: center !important; font-size: 14px !important; transition: background 0.2s !important; }
.qty-btn:hover { background: rgba(217,232,235,0.3) !important; }
.qty-input { width: 40px !important; border: none !important; border-left: 0.5px solid rgba(14,27,48,0.15) !important; border-right: 0.5px solid rgba(14,27,48,0.15) !important; text-align: center !important; font-family: 'Jost', sans-serif !important; font-size: 13px !important; font-weight: 400 !important; color: #0E1B30 !important; outline: none !important; background: transparent !important; padding: 0 !important; margin: 0 !important; -moz-appearance: textfield; }
.qty-input::-webkit-outer-spin-button, .qty-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
"""
html_content = html_content.replace(form_cart_old.strip(), form_cart_new.strip())

# 7. Update Button
btn_old = """
.se-card-form button.single_add_to_cart_button {
  font-family: 'Jost', sans-serif !important;
  font-size: 10px !important;
  font-weight: 500 !important;
  letter-spacing: 0.25em !important;
  text-transform: uppercase !important;
  color: #F7F0EC !important;
  background: #0E1B30 !important;
  border: none !important;
  padding: 18px 24px !important;
  border-radius: 2px !important;
  cursor: pointer !important;
  width: 100% !important;
  transition: background 0.3s ease, transform 0.2s ease !important;
}
.se-card-form button.single_add_to_cart_button:hover {
  background: #1D3152 !important;
  transform: translateY(-2px) !important;
}
"""

btn_new = """
.se-card-form button.single_add_to_cart_button {
  font-family: 'Jost', sans-serif !important;
  font-size: 10px !important;
  font-weight: 500 !important;
  letter-spacing: 0.22em !important;
  text-transform: uppercase !important;
  color: #F7F0EC !important;
  background: #0E1B30 !important;
  border: none !important;
  padding: 16px 24px !important;
  border-radius: 2px !important;
  cursor: pointer !important;
  width: 100% !important;
  transition: all 0.3s ease !important;
  line-height: normal !important;
}
.se-card-form button.single_add_to_cart_button:hover {
  background: #1D3152 !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(14,27,48,0.1) !important;
}
"""
html_content = html_content.replace(btn_old.strip(), btn_new.strip())

# 8. Add JS for Quantity styling
js_old = """
  // Move the native WooCommerce add-to-cart form into the booking card if not already there
"""
js_new = """
  // Move the native WooCommerce add-to-cart form into the booking card if not already there
  var qtyWrapper = document.querySelector('.se-card-form .quantity');
  var qtyInput = document.querySelector('.se-card-form .qty');
  if (qtyWrapper && qtyInput && !qtyWrapper.classList.contains('styled')) {
    qtyWrapper.classList.add('styled');
    
    Array.from(qtyWrapper.childNodes).forEach(function(child) {
      if (child !== qtyInput) qtyWrapper.removeChild(child);
    });
    
    var newWrapper = document.createElement('div');
    newWrapper.className = 'booking-qty-wrapper';
    
    var label = document.createElement('span');
    label.className = 'qty-label';
    label.innerText = 'Quantity';
    
    var selectors = document.createElement('div');
    selectors.className = 'qty-selectors';
    
    var minusBtn = document.createElement('button');
    minusBtn.type = 'button';
    minusBtn.className = 'qty-btn';
    minusBtn.innerText = '-';
    minusBtn.onclick = function() { 
      qtyInput.stepDown(); 
      qtyInput.dispatchEvent(new Event('change', { bubbles: true }));
    };
    
    var plusBtn = document.createElement('button');
    plusBtn.type = 'button';
    plusBtn.className = 'qty-btn';
    plusBtn.innerText = '+';
    plusBtn.onclick = function() { 
      qtyInput.stepUp(); 
      qtyInput.dispatchEvent(new Event('change', { bubbles: true }));
    };
    
    qtyInput.classList.add('qty-input');
    
    selectors.appendChild(minusBtn);
    selectors.appendChild(qtyInput);
    selectors.appendChild(plusBtn);
    
    newWrapper.appendChild(label);
    newWrapper.appendChild(selectors);
    
    qtyWrapper.appendChild(newWrapper);
  }
"""
html_content = html_content.replace(js_old.strip(), js_new.strip())

data['content'][0]['elements'][0]['settings']['html'] = html_content

with open(file_path, 'w') as f:
    json.dump(data, f, separators=(',', ':'))

print("Updated JSON successfully.")
