package com.unicornio.happyinseat.fragments

import android.content.Context
import android.content.Intent
import android.content.res.Configuration.UI_MODE_NIGHT_YES
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowForward
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.platform.LocalView
import androidx.compose.ui.platform.ViewCompositionStrategy
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.fragment.app.Fragment
import com.unicornio.happyinseat.R
import com.unicornio.happyinseat.activities.ExerciseActivity
import com.unicornio.happyinseat.ui.theme.ApplicationTheme
import com.unicornio.toolish.utils.Utils.shotToast

class HomeFragment : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        return ComposeView(requireContext()).apply {
            setViewCompositionStrategy(ViewCompositionStrategy.DisposeOnViewTreeLifecycleDestroyed)
            setContent {
                ApplicationTheme {
                    Surface {
                        HomeScreen()
                    }
                }
            }
        }
    }

    @Composable
    fun HomeScreen() {
        val context = LocalView.current.context

        Column(
            Modifier
                .fillMaxWidth()
                .padding(horizontal = 24.dp)
                .verticalScroll(rememberScrollState())
        ) {
            Spacer(modifier = Modifier.height(24.dp))

            ExerciseCard(
                "In Seat/ Stretching",
                R.drawable.ic_pic_stretching,
                listOf(
                    "- 7 moves",
                    "- Head, shoulder, arm, torso and leg",
                    "- Takes around 10 min"
                ),
                action = {
                    startActivity(Intent(it, ExerciseActivity::class.java))
                },
                true
            )

            Spacer(modifier = Modifier.height(24.dp))

            ExerciseCard(
                "In Seat/ Core Exercise",
                R.drawable.ic_pic_core,
                listOf(
                    "- 6 moves",
                    "- Takes around 10 min",
                    "- Might sweat a bit"
                ),
                action = {
                    it.shotToast("Coming soon")
                },
                false
            )

            Spacer(modifier = Modifier.height(24.dp))

            ExerciseCard(
                "Start a Journey",
                R.drawable.ic_pic_journey,
                listOf(
                    "Arrange stretching and core exercise throughout your journey to reduce the risk of neck pain, back pain and deep vein thrombosis"
                ),
                action = {
                    it.shotToast("Coming soon")
                },
                false
            )

            Spacer(modifier = Modifier.height(80.dp))
        }
    }

    @Composable
    private fun ExerciseCard(title: String, resId: Int, descriptions: List<String>, action: (Context) -> Unit, isAvailable: Boolean) {
        val context = LocalView.current.context

        Column {
            Box(
                Modifier
                    .fillMaxWidth()
                    .background(Color.LightGray)
            ) {
                Image(
                    painter = painterResource(id = resId), contentDescription = null,
                    Modifier
                        .align(Alignment.Center)
                        .padding(24.dp)
                )
            }

            Row(
                Modifier
                    .fillMaxWidth()
                    .background(Color.White)
                    .padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column(
                    Modifier.weight(1f)
                ) {
                    if (!isAvailable) {
                        ComingSoonTag()
                        Spacer(Modifier.height(4.dp))
                    }

                    Text(text = title, style = MaterialTheme.typography.h6, modifier = Modifier.alpha(if (isAvailable) 1f else 0.4f))

                    Spacer(modifier = Modifier.height(6.dp))

                    for (description in descriptions) {
                        Text(text = description, style = MaterialTheme.typography.caption, modifier = Modifier.alpha(if (isAvailable) 1f else 0.4f))
                    }
                }

                Spacer(modifier = Modifier.width(8.dp))

                IconButton(
                    onClick = { action.invoke(context) },
                    modifier = Modifier
                        .clip(CircleShape)
                        .alpha(if (isAvailable) 1f else 0.4f)
                        .background(Color.DarkGray)
                ) {
                    Icon(Icons.Filled.ArrowForward, contentDescription = null, tint = Color.White)
                }
            }
        }
    }

    @Composable
    fun ComingSoonTag() {
        Row {
            Image(
                painter = painterResource(id = R.drawable.ic_baseline_watch_later_24), contentDescription = null, modifier = Modifier
                    .width(16.dp)
                    .height(16.dp)
            )
            Spacer(modifier = Modifier.width(4.dp))
            Text(text = "coming soon", style = MaterialTheme.typography.body2, fontStyle = FontStyle.Italic)
        }
    }

    @Composable
    @Preview(name = "Day mode")
    @Preview(name = "Night mode", uiMode = UI_MODE_NIGHT_YES, showBackground = true)
    fun HomeScreenPreview() {
        ApplicationTheme {
            Surface {
                HomeScreen()
            }
        }
    }

    companion object {
        const val TAG = "HomeFragment"
    }
}