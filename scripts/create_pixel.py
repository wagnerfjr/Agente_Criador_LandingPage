#!/usr/bin/env python3
"""
Create or verify Meta Pixel for LR Fit Method
Uses Meta Graph API v19.0 (owned_pixels endpoint)
"""

import os
import requests

GRAPH_API_VERSION = "v19.0"  # Adjusted based on error
BASE_URL = f"https://graph.facebook.com/{GRAPH_API_VERSION}"

def get_or_create_pixel(pixel_name: str) -> str:
    """Create or retrieve Meta Pixel ID"""
    access_token = os.environ.get("META_ACCESS_TOKEN")

    # Try Ad Account ID first (format: act_XXXXXXXXXX)
    ad_account_id = os.environ.get("META_AD_ACCOUNT_ID")
    business_account_id = os.environ.get("META_BUSINESS_ACCOUNT_ID")

    if not access_token:
        raise ValueError("Set META_ACCESS_TOKEN env var")

    account_id = ad_account_id or business_account_id
    if not account_id:
        raise ValueError("Set META_AD_ACCOUNT_ID or META_BUSINESS_ACCOUNT_ID env vars")

    print(f"[INFO] Using account ID: {account_id}")

    # Try to find existing pixel
    print(f"[INFO] Looking for existing pixel '{pixel_name}'...")

    # Try adspixels endpoint (correct for Ad Account)
    url = f"{BASE_URL}/{account_id}/adspixels"
    params = {
        "fields": "id,name,creation_time",
        "access_token": access_token,
        "limit": 100,
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()

        # Look for existing pixel by name
        for pixel in data.get("data", []):
            if pixel.get("name", "").strip().lower() == pixel_name.strip().lower():
                pixel_id = pixel["id"]
                print(f"[FOUND] Pixel '{pixel_name}' already exists. ID: {pixel_id}")
                return pixel_id

    except requests.exceptions.HTTPError as e:
        print(f"[WARNING] Error checking for existing pixel: {e.response.status_code}")
        print(f"   Response: {e.response.text}")

    # Create new pixel
    print(f"[CREATE] Creating new pixel '{pixel_name}'...")
    url = f"{BASE_URL}/{account_id}/adspixels"
    payload = {
        "name": pixel_name,
        "access_token": access_token,
    }

    try:
        response = requests.post(url, data=payload)
        response.raise_for_status()
        data = response.json()

        pixel_id = data.get("id")
        if pixel_id:
            print(f"[SUCCESS] Pixel '{pixel_name}' created successfully. ID: {pixel_id}")
            return pixel_id
        else:
            raise ValueError(f"No pixel ID in response: {data}")

    except requests.exceptions.HTTPError as e:
        print(f"[ERROR] Error creating pixel: {e.response.status_code}")
        print(f"   Response: {e.response.text}")
        raise


if __name__ == "__main__":
    try:
        pixel_id = get_or_create_pixel("LR Fit Method")
        print(f"\n[SUCCESS] VITE_META_PIXEL_ID={pixel_id}")
        print("[INFO] Copy this line to your .env.local")
    except Exception as e:
        print(f"\n[ERROR] {e}")
        exit(1)
