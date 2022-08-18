package com.unicornio.happyinseat.application

import android.app.Application
import com.unicornio.happyinseat.AnalyticsManager

class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        AnalyticsManager.setContext(this)
    }

    companion object {
        val TAG = MyApplication::class.java.canonicalName
    }
}