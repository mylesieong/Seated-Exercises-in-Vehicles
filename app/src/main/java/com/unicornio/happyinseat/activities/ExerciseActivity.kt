package com.unicornio.happyinseat.activities

import android.os.Bundle
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.unicornio.happyinseat.AdManager
import com.unicornio.happyinseat.ComposeAlertDialog
import com.unicornio.happyinseat.screens.FinishScreen
import com.unicornio.happyinseat.screens.MoveScreen
import com.unicornio.happyinseat.screens.OverviewScreen
import com.unicornio.happyinseat.setKeepScreenOn
import com.unicornio.happyinseat.ui.theme.ApplicationTheme

class ExerciseActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ApplicationTheme {
                ExerciseScreen()
            }
        }
        setKeepScreenOn(true)
    }

    override fun onDestroy() {
        super.onDestroy()
        setKeepScreenOn(false)
    }

    @Composable
    private fun ExerciseScreen() {
        val navController = rememberNavController()

        val openDialog = remember { mutableStateOf(false) }

        if (openDialog.value) {
            ComposeAlertDialog(
                title = "Exit",
                description = "Leave current exercise",
                onPositive = {
                    navController.navigate("overview") {
                        popUpTo("overview") {
                            inclusive = true
                        }
                    }
                    openDialog.value = false
                },
                onNegative = {
                    openDialog.value = false
                },
                onDismiss = {
                    openDialog.value = false
                })
        }

        BackHandler(
            enabled = true,
            onBack = {
                when (navController.currentBackStackEntry?.destination?.route) {
                    "overview" -> {
                        finishAfterTransition()
                    }
                    "move/{moveIndex}" -> {
                        openDialog.value = true
                    }
                    "finish" -> {
                        AdManager.loadAndShowInterstitialAdHoweverSilentIfAdsNotReady(
                            this,
                            undergoActionIfShowAd = { },
                            postAction = {
                                navController.navigate("overview") {
                                    popUpTo("overview") {
                                        inclusive = true
                                    }
                                }
                            }
                        )
                    }
                    null -> {
                        finishAfterTransition()
                    }
                }
            }
        )

        NavHost(
            navController = navController,
            startDestination = "overview"

        ) {
            composable("overview") {
                OverviewScreen(
                    onExit = {
                        finishAfterTransition()
                    },
                    onNavigateToMove = {
                        navController.navigate("move/0")
                    }
                )
            }

            composable(
                route = "move/{moveIndex}",
                arguments = listOf(navArgument("moveIndex") { type = NavType.IntType })
            ) {
                MoveScreen(
                    moveIndex = it.arguments?.getInt("moveIndex"),
                    onExit = {
                        navController.navigate("overview") {
                            popUpTo("overview") {
                                inclusive = true
                            }
                        }
                    },
                    onNavigateToMove = { moveIndex ->
                        navController.navigate("move/$moveIndex") {
                            popUpTo("overview") {
                                inclusive = false
                            }
                        }
                    },
                    onNavigateToFinish = {
                        navController.navigate("finish")
                    }
                )
            }

            composable("finish") {
                FinishScreen(
                    onExit = {
                        AdManager.loadAndShowInterstitialAdHoweverSilentIfAdsNotReady(
                            this@ExerciseActivity,
                            undergoActionIfShowAd = { },
                            postAction = {
                                navController.navigate("overview") {
                                    popUpTo("overview") {
                                        inclusive = true
                                    }
                                }
                            }
                        )
                    },
                    onOnceMore = {
                        AdManager.loadAndShowInterstitialAdHoweverSilentIfAdsNotReady(
                            this@ExerciseActivity,
                            undergoActionIfShowAd = { },
                            postAction = {
                                navController.navigate("overview") {
                                    popUpTo("overview") {
                                        inclusive = true
                                    }
                                }
                            }
                        )
                    },
                    onFinish = {
                        AdManager.loadAndShowInterstitialAdHoweverSilentIfAdsNotReady(
                            this@ExerciseActivity,
                            undergoActionIfShowAd = { },
                            postAction = {
                                finishAfterTransition()
                            }
                        )
                    }
                )
            }
        }
    }

    companion object {
        val TAG = ExerciseActivity::class.java.canonicalName
    }
}