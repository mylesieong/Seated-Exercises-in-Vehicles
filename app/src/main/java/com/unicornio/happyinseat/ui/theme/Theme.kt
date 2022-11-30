package com.unicornio.happyinseat.ui.theme

import android.util.Log
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material.MaterialTheme
import androidx.compose.material.darkColors
import androidx.compose.material.lightColors
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

val amber_50 = Color(0xFFFFF8E1)
val amber_100 = Color(0xFFFFECB3)
val amber_200 = Color(0xFFFFE082)
val amber_300 = Color(0xFFFFD54F)
val amber_400 = Color(0xFFFFCA28)
val amber_500 = Color(0xFFFFC107)
val amber_600 = Color(0xFFFFB300)
val amber_700 = Color(0xFFFFA000)
val amber_800 = Color(0xFFFF8F00)
val amber_900 = Color(0xFFFF6F00)
val amber_A100 = Color(0xFFFFE57F)
val amber_A200 = Color(0xFFFFD740)
val amber_A400 = Color(0xFFFFC400)
val amber_A700 = Color(0xFFFFAB00)

val blue_50 = Color(0xFFE3F2FD)
val blue_100 = Color(0xFFBBDEFB)
val blue_200 = Color(0xFF90CAF9)
val blue_300 = Color(0xFF64B5F6)
val blue_400 = Color(0xFF42A5F5)
val blue_500 = Color(0xFF2196F3)
val blue_600 = Color(0xFF1E88E5)
val blue_700 = Color(0xFF1976D2)
val blue_800 = Color(0xFF1565C0)
val blue_900 = Color(0xFF0D47A1)
val blue_A100 = Color(0xFF82B1FF)
val blue_A200 = Color(0xFF448AFF)
val blue_A400 = Color(0xFF2979FF)
val blue_A700 = Color(0xFF2962FF)

val blue_grey_50 = Color(0xFFECEFF1)
val blue_grey_100 = Color(0xFFCFD8DC)
val blue_grey_200 = Color(0xFFB0BBC5)
val blue_grey_300 = Color(0xFF90A4AE)
val blue_grey_400 = Color(0xFF78909C)
val blue_grey_500 = Color(0xFF607D8B)
val blue_grey_600 = Color(0xFF546E7A)
val blue_grey_700 = Color(0xFF455A64)
val blue_grey_800 = Color(0xFF37474F)
val blue_grey_900 = Color(0xFF263238)


private val DayThemeColorPalette = lightColors(
    primary = amber_400,
    primaryVariant = amber_600,
    onPrimary = Color.Black,
    secondary = blue_300,
    secondaryVariant = blue_500,
    onSecondary = Color.Black,
    background = Color.White,
    onBackground = Color.Black,
    surface = blue_grey_100,
    onSurface = Color.Black,
    error = Color.Red
)

private val DarkThemeColorPalette = darkColors(
    primary = amber_400,
    primaryVariant = amber_600,
    onPrimary = Color.Black,
    secondary = blue_300,
    secondaryVariant = blue_500,
    onSecondary = Color.Black,
    background = Color.Black,
    onBackground = Color.White,
    surface = blue_grey_900,
    onSurface = Color.White,
    error = Color.Red
)

@Composable
fun ApplicationTheme(darkTheme: Boolean = isSystemInDarkTheme(), content: @Composable () -> Unit) {
    val colors = if (darkTheme) {
        Log.d(TAG, "ApplicationTheme: using dark theme")
        DarkThemeColorPalette
    } else {
        Log.d(TAG, "ApplicationTheme: using day theme")
        DayThemeColorPalette
    }

    MaterialTheme(
        colors = colors,
        content = content
    )
}

const val TAG = "Theme"