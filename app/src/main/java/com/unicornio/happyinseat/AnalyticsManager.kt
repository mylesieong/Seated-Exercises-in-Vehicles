package com.unicornio.happyinseat

import android.content.Context
import android.util.Log
import com.google.firebase.analytics.FirebaseAnalytics
import com.google.firebase.analytics.ktx.logEvent

object AnalyticsManager {

    const val MY_EVENT_START_EXERCISE_STRETCH = "my_event_start_exercise_stretch"
    const val MY_EVENT_FINISH_EXERCISE_STRETCH = "my_event_finish_exercise_stretch"

    private const val TAG = "AnalyticsManager"
    private var analytics: FirebaseAnalytics? = null

    fun setContext(context: Context) {
        analytics = FirebaseAnalytics.getInstance(context).also {
            Log.d(TAG, "setContext: analytics object is init as $analytics")
        }
    }

    fun logEvent(eventName: String) {
        if (analytics == null) {
            Log.w(TAG, "logEvent: analytics object is null")
            return
        }

        analytics?.logEvent(eventName, null)
    }
}