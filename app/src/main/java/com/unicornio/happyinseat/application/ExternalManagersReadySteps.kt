package com.unicornio.happyinseat.application

import android.content.Context
import com.google.android.gms.ads.MobileAds
import com.unicornio.happyinseat.AdManager
import com.unicornio.happyinseat.AnalyticsManager
import dagger.hilt.android.qualifiers.ApplicationContext
import javax.inject.Inject

class ExternalManagersReadySteps @Inject constructor(
    @ApplicationContext val context: Context
) {
    fun run() {
        MobileAds.initialize(context) { }
        AdManager.preloadFirstAd(context)
        AnalyticsManager.setContext(context)
    }
}