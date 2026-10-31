/**
 * Stillness — Diagnostic Prescription: variable product
 *
 * IMPORT: WordPress admin > Products > All > Import, or WooCommerce
 * product CSV importer. Creates a variable product with four variations.
 *
 * WHY A VARIABLE PRODUCT AND NOT FOUR PRODUCTS: one parent, one checkout
 * page, one place to change price or content later. The result type lives on
 * the variation, so the order records which prescription was bought.
 *
 * SKU stillness-diagnostic-prescription is the contract with
 * stillness_quiz_variation_ids() in snippets/diagnostic-quiz.php. Change one,
 * change both.
 */

const product = {
  "Name": "Diagnostic Prescription",
  "SKU": "stillness-diagnostic-prescription",
  "Type": "variable",
  "Short description": "Your full Stillness prescription, matched to your diagnostic result. Audio practices, a workbook, and reference material for your regulation type.",
  "Description": "Your prescription is built around one of four regulation types. You will receive the complete practice sequence for your type, audio sessions, and a workbook to work through at your own pace.",
  "Purchasable": "yes",
  "Virtual": "yes",
  "In stock": "yes",
  "Downloads": "yes",
  "Tax status": "taxable",
  "Tax class": "empty",
  "Regular price": "1999",
  "Sale price": "",
  "Price": "1999",
  "Manage stock": "no",
  "Weight": "",
  "Length": "", "Width": "", "Height": "",
  "Categories": "Programs",
  "Tags": "diagnostic, prescription",
  "Images": "",
  "Featured": "no",
  "Catalog visibility": "visible",
  "Reviews allowed": "no",
  "Upsells": "",
  "Cross-sells": "",
  "External URL": "",
  "Button text": "",
  "Purchase note": "Your prescription unlocks immediately after payment.",
  "Attributes": "result-type,PA,result-type,PB,result-type,PC,result-type,PD|color,Result type,Result type,Result type,Result type",
  "Attribute visibility": "visible|hidden|hidden|hidden",
  "Attribute has taxonomy": "no|yes|yes|yes",
  "Sub_attributes": "result-type,A,The Racing Mind|result-type,B,Running on Empty|result-type,C,Ready to Go Deeper|result-type,D,Up and Down",

  // Variations. Attribute slug must match the taxonomy slug: result-type.
  "variation": [
    {
      "sku": "stillness-prescription-A",
      "result-type": "A",
      "Regular price": "1999", "Price": "1999", "Sale price": "",
      "Purchasable": "yes", "In stock": "yes", "Virtual": "yes",
      "Weight": "", "Length": "", "Width": "", "Height": "",
      "Tax status": "taxable", "Tax class": "empty",
      "Manage stock": "no", "Backorders": "no",
      "Downloads": "yes",
      "Description": "The Racing Mind. Practice sequence, audio sessions and workbook for a system running hot.",
      "Images": ""
    },
    {
      "sku": "stillness-prescription-B",
      "result-type": "B",
      "Regular price": "1999", "Price": "1999", "Sale price": "",
      "Purchasable": "yes", "In stock": "yes", "Virtual": "yes",
      "Weight": "", "Length": "", "Width": "", "Height": "",
      "Tax status": "taxable", "Tax class": "empty",
      "Manage stock": "no", "Backorders": "no",
      "Downloads": "yes",
      "Description": "Running on Empty. Practice sequence, audio sessions and workbook for a system that has gone quiet to stay safe.",
      "Images": ""
    },
    {
      "sku": "stillness-prescription-C",
      "result-type": "C",
      "Regular price": "1999", "Price": "1999", "Sale price": "",
      "Purchasable": "yes", "In stock": "yes", "Virtual": "yes",
      "Weight": "", "Length": "", "Width": "", "Height": "",
      "Tax status": "taxable", "Tax class": "empty",
      "Manage stock": "no", "Backorders": "no",
      "Downloads": "yes",
      "Description": "Ready to Go Deeper. Practice sequence, audio sessions and workbook for a system that has learned to stay safe on high alert.",
      "Images": ""
    },
    {
      "sku": "stillness-prescription-D",
      "result-type": "D",
      "Regular price": "1999", "Price": "1999", "Sale price": "",
      "Purchasable": "yes", "In stock": "yes", "Virtual": "yes",
      "Weight": "", "Length": "", "Width": "", "Height": "",
      "Tax status": "taxable", "Tax class": "empty",
      "Manage stock": "no", "Backorders": "no",
      "Downloads": "yes",
      "Description": "Up and Down. Practice sequence, audio sessions and workbook for a system that swings between both modes.",
      "Images": ""
    }
  ],

  "_meta": {
    "note": "Price confirmed by Komal at ₹1,999 across all four variations. Attach the audio sessions and workbook per variation AFTER import; one customer cannot download another type's files. Apply coupons after import, not a sale price — a sale on a variable product shows one struck-through price across all four types and undercuts the positioning."
  }
};

module.exports = product;