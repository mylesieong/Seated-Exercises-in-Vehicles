package com.unicornio.happyinseat

import android.app.Activity
import android.content.Context
import android.util.Log
import com.google.android.gms.ads.*
import com.google.android.gms.ads.interstitial.InterstitialAd
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback

object AdManager {
    private const val TAG = "AdManager"

    private var interstitialAd: InterstitialAd? = null
    private var isInterstitialAdLoading: Boolean = false

    fun preloadFirstAd(context: Context) {
        clearAndRequestNewInterstitialAd(context)
    }

    private fun clearAndRequestNewInterstitialAd(context: Context) {
        Log.d(TAG, "clearAndRequestNewInterstitialAd")

        val adRequest = AdRequest.Builder().build()

        interstitialAd = null
        isInterstitialAdLoading = true

        InterstitialAd.load(context, BuildConfig.AD_UNIT_ID_INTERSTITIAL, adRequest, object : InterstitialAdLoadCallback() {
            override fun onAdLoaded(ad: InterstitialAd) {
                Log.d(TAG, "clearAndRequestNewInterstitialAd: onAdLoaded")
                interstitialAd = ad
                isInterstitialAdLoading = false
            }

            override fun onAdFailedToLoad(error: LoadAdError) {
                Log.d(TAG, "clearAndRequestNewInterstitialAd: onAdFailedToLoad adError=${error.message}")
                interstitialAd = null
                isInterstitialAdLoading = false
            }
        })
    }

    /**
     * Method will show ad if it's loaded and ready to be shown. If not, ads loading progress will be continued and method will return and wait for next call
     * Besides, once ad is played next ad will be requested automatically
     */
    fun loadAndShowInterstitialAdHoweverSilentIfAdsNotReady(activity: Activity, undergoActionIfShowAd: () -> Unit, postAction: () -> Unit) {

        fun isAdLoading() = interstitialAd == null && isInterstitialAdLoading

        fun isAdReady() = interstitialAd != null

        when {
            isAdReady() -> {
                Log.d(TAG, "loadAndShowInterstitialAd: ad is ready. playing now.")

                interstitialAd?.fullScreenContentCallback = object : FullScreenContentCallback() {
                    override fun onAdDismissedFullScreenContent() {
                        Log.d(TAG, "loadAndShowInterstitialAd: onAdDismissedFullScreenContent")
                        postAction.invoke()
                    }

                    override fun onAdFailedToShowFullScreenContent(adError: AdError) {
                        Log.d(TAG, "loadAndShowInterstitialAd: onAdFailedToShowFullScreenContent adError=$adError")
                        //TODO what would cause this case and should we request ad again?
                        postAction.invoke()
                    }

                    override fun onAdShowedFullScreenContent() {
                        Log.d(TAG, "loadAndShowInterstitialAd: onAdShowedFullScreenContent")
                        clearAndRequestNewInterstitialAd(activity)
                        undergoActionIfShowAd.invoke()
                    }
                }

                interstitialAd?.show(activity)
            }

            isAdLoading() -> {
                Log.d(TAG, "loadAndShowInterstitialAd: ad is still loading. please call method again later. Unblock caller for now.")
                postAction.invoke()
            }

            else -> {
                Log.d(TAG, "loadAndShowInterstitialAd: ad is not requested nor ready, request for the first time. Unblock caller for now.")
                clearAndRequestNewInterstitialAd(activity)
                postAction.invoke()
            }
        }
    }

    fun loadBannerAd(adView: AdView) {
        Log.d(TAG, "loadBannerAd")

        val adRequest: AdRequest = AdRequest.Builder().build()
        adView.loadAd(adRequest)
    }
}