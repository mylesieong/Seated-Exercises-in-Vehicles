package com.unicornio.happyinseat.activities

import android.content.res.Configuration.UI_MODE_NIGHT_YES
import android.os.Bundle
import androidx.activity.compose.setContent
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Menu
import androidx.compose.runtime.Composable
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.unicornio.happyinseat.R
import com.unicornio.happyinseat.fragments.HistoryScreen
import com.unicornio.happyinseat.fragments.HomeScreen
import com.unicornio.happyinseat.fragments.SettingScreen
import com.unicornio.happyinseat.ui.theme.ApplicationTheme
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ApplicationTheme {
                Surface {
                    MainScreen()
                }
            }
        }
    }
}

@Composable
fun MainScreen() {
    val navController = rememberNavController()
    val drawerState = rememberDrawerState(DrawerValue.Closed)

    val scope = rememberCoroutineScope()
    val openDrawer = {
        scope.launch {
            drawerState.open()
        }
    }

    val closeDrawer = {
        scope.launch {
            drawerState.open()
        }
    }

    ModalDrawer(
        drawerState = drawerState,
        gesturesEnabled = true,
        drawerBackgroundColor = Color.Black,
        drawerContent = {
            Column(modifier = Modifier.padding(horizontal = 24.dp)) {
                Spacer(modifier = Modifier.height(100.dp))

                Box(
                    modifier = Modifier
                        .clip(CircleShape)
                        .background(Color.Yellow)
                        .padding(16.dp)
                ) {
                    Image(
                        painter = painterResource(id = R.drawable.ic_logo_foreground), contentDescription = null,
                        modifier = Modifier
                            .height(64.dp)
                            .width(64.dp)
                    )
                }

                Spacer(Modifier.height(24.dp))

                MenuItem("home", R.drawable.ic_baseline_home_24) {
                    navController.navigate("home") {
                        popUpTo("home") {
                            inclusive = true
                        }
                    }

                    closeDrawer.invoke()
                }

                Spacer(Modifier.height(24.dp))

                MenuItem("history", R.drawable.ic_baseline_history_24) {
                    navController.navigate("history") {
                        popUpTo("history") {
                            inclusive = true
                        }
                    }

                    closeDrawer.invoke()
                }

                Spacer(Modifier.height(24.dp))

                MenuItem("setting", R.drawable.ic_baseline_settings_24) {
                    navController.navigate("setting") {
                        popUpTo("setting") {
                            inclusive = true
                        }
                    }

                    closeDrawer.invoke()
                }

            }
        }
    ) {
        NavHost(
            navController = navController,
            startDestination = "home"
        ) {
            composable("home") {
                Column(Modifier.fillMaxSize()) {
                    MyTopAppBar("Home", openDrawer)
                    HomeScreen()
                }
            }

            composable("history") {
                Column(Modifier.fillMaxSize()) {
                    MyTopAppBar("History", openDrawer)
                    HistoryScreen()
                }
            }

            composable("setting") {
                Column(Modifier.fillMaxSize()) {
                    MyTopAppBar("Setting", openDrawer)
                    SettingScreen()
                }
            }
        }
    }
}

@Composable
fun MenuItem(title: String, iconResId: Int, onClick: () -> Unit) {
    Row {
        Image(painter = painterResource(id = iconResId), contentDescription = null)
        Spacer(modifier = Modifier.width(8.dp))
        Text(
            text = title,
            style = MaterialTheme.typography.subtitle1,
            modifier = Modifier.clickable { onClick.invoke() }
        )
    }
}

@Composable
private fun MyTopAppBar(title: String, openDrawer: () -> Job) {
    TopAppBar(
        title = {
            Text(text = title)
        },
        navigationIcon = {
            IconButton(onClick = {
                openDrawer.invoke()
            }) {
                Icon(Icons.Filled.Menu, contentDescription = null)
            }
        },
    )
}

@Preview(name = "Day mode")
@Preview(name = "Night mode", uiMode = UI_MODE_NIGHT_YES, showBackground = true)
@Composable
fun MainScreenPreview() {
    ApplicationTheme {
        Surface {
            MainScreen()
        }
    }
}
