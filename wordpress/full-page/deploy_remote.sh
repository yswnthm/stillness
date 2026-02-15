#!/bin/bash

# Configuration
REMOTE_USER="u774221655"
REMOTE_HOST="147.93.93.42"
REMOTE_PORT="65002"
REMOTE_PATH="domains/wearestillness.com/public_html"

# Default to the step 2 file if provided, otherwise fallback
LOCAL_JSON="${1:-staging_page_4491_step2.json}"
REMOTE_JSON_NAME="update_$(date +%s).json"
PAGE_ID="4493" # Hardcoded ID for duplicatepage1

echo "Target Page ID: $PAGE_ID"
echo "Local JSON File: $LOCAL_JSON"

if [ ! -f "$LOCAL_JSON" ]; then
    echo "❌ Error: Local JSON file '$LOCAL_JSON' not found!"
    exit 1
fi

# 1. Upload JSON
echo "Uploading $LOCAL_JSON to server as $REMOTE_JSON_NAME..."
scp -P $REMOTE_PORT "$LOCAL_JSON" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/$REMOTE_JSON_NAME"

if [ $? -ne 0 ]; then
    echo "Upload failed. Please check your SSH connection."
    exit 1
fi

# 2. Update Page
echo "Updating page $PAGE_ID on server..."
ssh -p $REMOTE_PORT "$REMOTE_USER@$REMOTE_HOST" << EOF
    cd $REMOTE_PATH
    
    # Ensure WP-CLI is available
    export PATH=\$PATH:/usr/local/bin:/usr/bin

    if ! command -v wp &> /dev/null; then
        echo "❌ WP-CLI not found."
        exit 1
    fi

    echo "✅ Found WP-CLI"

    # 3. Apply Elementor Data
    echo "Applying Elementor data from $REMOTE_JSON_NAME..."

    # Use PHP to update commands safely without passing arguments to wp eval directly
    # Interpolating variables directly into the command string avoids argument parsing issues
    # IMPORTANT: wp_slash() is required because Elementor expects slashed JSON in the database
    # Update _elementor_data using direct file reading via PHP one-liner which is safer
    wp eval "update_post_meta($PAGE_ID, '_elementor_data', wp_slash(file_get_contents('$REMOTE_JSON_NAME')));"

    # Set edit mode
    wp post meta update $PAGE_ID _elementor_edit_mode builder

    # Clear post_content to force regeneration
    wp post update $PAGE_ID --post_content=""

    echo "✅ Database updated successfully."

    # Flush CSS and Cache
    wp elementor flush_css
    wp cache flush
    
    # Cleanup remote JSON
    rm "$REMOTE_JSON_NAME"

    echo "✅ Successfully updated page $PAGE_ID and cleaned up."
EOF
