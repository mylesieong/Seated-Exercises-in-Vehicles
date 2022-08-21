package com.unicornio.happyinseat

import android.app.Activity
import android.util.Log
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.AdView

object AdManager {
    private const val TAG = "AdManager"

    fun loadBannerAd(adView: AdView) {
        Log.d(TAG, "loadBannerAd")

        val adRequest: AdRequest = AdRequest.Builder().build()
        adView.loadAd(adRequest)
    }
}