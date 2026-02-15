#!/bin/bash
# Remote verification for wearestillness.com
ssh -p 65002 u774221655@147.93.93.42 "wp post list --post_type=page --name=duplicate1-page --path=domains/wearestillness.com/public_html --format=ids"
