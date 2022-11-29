package com.unicornio.happyinseat.activities

import android.os.Bundle
import android.util.Log
import androidx.activity.compose.setContent
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.NavBackStackEntry
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.unicornio.happyinseat.AdManager
import com.unicornio.happyinseat.screens.FinishScreen
import com.unicornio.happyinseat.screens.MoveScreen
import com.unicornio.happyinseat.screens.OverviewScreen

class ExerciseActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            val navController = rememberNavController()

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
    }

    private fun debugBackQueue(queue: ArrayDeque<NavBackStackEntry>) {
        Log.d(
            TAG, "backQueue=${
                queue.map {
                    "id=${it.id}, displayName=${it.destination.displayName}, route=${it.destination.route}, label=${it.destination.label}\n"
                }
            }"
        )
    }

    companion object {
        val TAG = ExerciseActivity::class.java.canonicalName
    }
}