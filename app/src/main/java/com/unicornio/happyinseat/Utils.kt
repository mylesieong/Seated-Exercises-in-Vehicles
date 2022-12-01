package com.unicornio.happyinseat.helpers

import android.util.Log
import androidx.navigation.NavBackStackEntry

const val TAG = "Utils.kt"

fun debugBackQueue(queue: ArrayDeque<NavBackStackEntry>) {
    Log.d(TAG, "debugBackQueue: ${
        queue.map {
            "id=${it.id}, displayName=${it.destination.displayName}, route=${it.destination.route}, label=${it.destination.label}\n"
        }
    }"
    )
}