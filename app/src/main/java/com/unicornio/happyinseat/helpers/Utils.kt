package com.unicornio.happyinseat.helpers

import android.os.Bundle
import android.util.Log
import androidx.navigation.NavController

const val TAG = "Utils.kt"

fun NavController.navigateSafely(action: Int) {
    try {
        navigate(action)
    } catch (e: IllegalArgumentException) {
        Log.w(TAG, "navigateSafely: navigation exception when checking current destination and action")
    }
}

fun NavController.navigateSafely(action: Int, bundle: Bundle) {
    try {
        navigate(action, bundle)
    } catch (e: IllegalArgumentException) {
        Log.w(TAG, "navigateSafely: navigation exception when checking current destination and action")
    }
}