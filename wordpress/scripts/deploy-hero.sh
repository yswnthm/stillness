#!/bin/bash
# Deploy Hero Section to duplicate1-page (ID: 4493)
# Usage: ./wordpress/scripts/deploy-hero.sh

CONTENT=$(cat wordpress/templates/hero-section.html)

ssh -p 65002 u774221655@147.93.93.42 "wp post update 4493 --post_content='$CONTENT' --path=domains/wearestillness.com/public_html"
