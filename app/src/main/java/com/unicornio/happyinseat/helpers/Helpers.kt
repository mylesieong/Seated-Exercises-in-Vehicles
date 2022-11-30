package com.unicornio.happyinseat.helpers

import android.content.ActivityNotFoundException
import android.content.Context
import android.content.Intent
import android.net.Uri

fun rateApp(context: Context) {
    fun rateIntentForUrl(url: String): Intent {
        val packageName = context.packageName
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(String.format("%s?id=%s", url, packageName)))
        val flags = Intent.FLAG_ACTIVITY_NO_HISTORY or Intent.FLAG_ACTIVITY_MULTIPLE_TASK or Intent.FLAG_ACTIVITY_NEW_DOCUMENT
        intent.addFlags(flags)
        return intent
    }

    try {
        val rateIntent = rateIntentForUrl("market://details")
        context.startActivity(rateIntent)

    } catch (e: ActivityNotFoundException) {
        val rateIntent = rateIntentForUrl("https://play.google.com/store/apps/details")
        context.startActivity(rateIntent)
    }
}
