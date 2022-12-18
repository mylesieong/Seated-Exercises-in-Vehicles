package com.unicornio.happyinseat.application

import android.app.Application
import dagger.hilt.android.HiltAndroidApp
import javax.inject.Inject

@HiltAndroidApp
class MyApplication : Application() {

    @Inject
    lateinit var readySteps: ExternalManagersReadySteps

    override fun onCreate() {
        super.onCreate()
        readySteps.run()
    }

    companion object {
        val TAG = MyApplication::class.java.canonicalName
    }
}