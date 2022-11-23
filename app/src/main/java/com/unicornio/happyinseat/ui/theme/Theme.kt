package com.unicornio.happyinseat.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material.MaterialTheme
import androidx.compose.material.darkColors
import androidx.compose.material.lightColors
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

val amber_50 = Color(0xFFF8E1)
val amber_100 = Color(0xFFECB3)
val amber_200 = Color(0xFFE082)
val amber_300 = Color(0xFFD54F)
val amber_400 = Color(0xFFCA28)
val amber_500 = Color(0xFFC107)
val amber_600 = Color(0xFFB300)
val amber_700 = Color(0xFFA000)
val amber_800 = Color(0xFF8F00)
val amber_900 = Color(0xFF6F00)
val amber_A100 = Color(0xFFE57F)
val amber_A200 = Color(0xFFD740)
val amber_A400 = Color(0xFFC400)
val amber_A700 = Color(0xFFAB00)

val blue_50 = Color(0xE3F2FD)
val blue_100 = Color(0xBBDEFB)
val blue_200 = Color(0x90CAF9)
val blue_300 = Color(0x64B5F6)
val blue_400 = Color(0x42A5F5)
val blue_500 = Color(0x2196F3)
val blue_600 = Color(0x1E88E5)
val blue_700 = Color(0x1976D2)
val blue_800 = Color(0x1565C0)
val blue_900 = Color(0x0D47A1)
val blue_A100 = Color(0x82B1FF)
val blue_A200 = Color(0x448AFF)
val blue_A400 = Color(0x2979FF)
val blue_A700 = Color(0x2962FF)

val blue_grey_50 = Color(0xECEFF1)
val blue_grey_100 = Color(0xCFD8DC)
val blue_grey_200 = Color(0xB0BBC5)
val blue_grey_300 = Color(0x90A4AE)
val blue_grey_400 = Color(0x78909C)
val blue_grey_500 = Color(0x607D8B)
val blue_grey_600 = Color(0x546E7A)
val blue_grey_700 = Color(0x455A64)
val blue_grey_800 = Color(0x37474F)
val blue_grey_900 = Color(0x263238)

private val DayThemeColorPalette = lightColors(
    primary = amber_400,
    primaryVariant = amber_600,
    onPrimary= Color.Black,
    secondary = blue_300,
    secondaryVariant = blue_500,
    onSecondary = Color.Black,
    background = Color.Black,
    onBackground = Color.White,
    surface = blue_grey_900,
    onSurface = Color.White,
    error = Color.Red
)

private val DarkThemeColorPalette = darkColors(
    primary = amber_400,
    primaryVariant = amber_600,
    onPrimary= Color.Black,
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
        DarkThemeColorPalette
    } else {
        DayThemeColorPalette
    }

    MaterialTheme(
        colors = colors,
        content = content
    )
}