package com.unicornio.happyinseat.application

import android.app.Application
import com.google.android.gms.ads.MobileAds
import com.unicornio.happyinseat.AdManager
import com.unicornio.happyinseat.AnalyticsManager

class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        MobileAds.initialize(this) { }
        AdManager.preloadFirstAd(this)

        AnalyticsManager.setContext(this)
    }

    companion object {
        val TAG = MyApplication::class.java.canonicalName
    }
}