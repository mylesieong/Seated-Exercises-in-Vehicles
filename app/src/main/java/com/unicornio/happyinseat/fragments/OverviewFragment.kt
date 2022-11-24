package com.unicornio.happyinseat.fragments

import android.content.res.Configuration
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ColorFilter.Companion.tint
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.platform.ViewCompositionStrategy
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.fragment.app.Fragment
import com.unicornio.happyinseat.R
import com.unicornio.happyinseat.ui.theme.ApplicationTheme

class OverviewFragment : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View = ComposeView(requireContext()).apply {
        setViewCompositionStrategy(ViewCompositionStrategy.DisposeOnViewTreeLifecycleDestroyed)
        setContent {
            ApplicationTheme {
                Surface {
                    OverviewScreen()
                }
            }
        }
    }

    @Composable
    fun OverviewScreen() {
        Column(modifier = Modifier.fillMaxSize()) {
            Header()
            //TODO content
        }
    }

    @Composable
    private fun Header() {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .wrapContentHeight()
                .background(Color.LightGray)
        ) {

            Image(
                modifier = Modifier
                    .padding(16.dp)
                    .width(24.dp)
                    .height(24.dp),
                colorFilter = tint(Color.Black),
                painter = painterResource(id = R.drawable.ic_baseline_arrow_back_24),
                contentDescription = null
            )

            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text(
                    text = "In Seat/ Stretching",
                    modifier = Modifier.padding(top = 24.dp),
                    style = MaterialTheme.typography.h6
                )

                Text(
                    text = "When travel a long trip in a confined seat, stretching will help reduce neck pain and back pain, improve the blood circulation as long as lower the risk of DVT(Deep Vein Thrombosis).",
                    modifier = Modifier.padding(24.dp),
                    style = MaterialTheme.typography.caption
                )

                Row(modifier = Modifier.fillMaxWidth().padding(bottom = 24.dp)) {
                    Box(modifier = Modifier.weight(1f), contentAlignment = Alignment.Center) {
                        statisticCard(name = "Moves", value = "6")
                    }
                    Box(modifier = Modifier.weight(1f), contentAlignment = Alignment.Center) {
                        statisticCard(name = "Time", value = "10 mins")
                    }
                    Box(modifier = Modifier.weight(1f), contentAlignment = Alignment.Center) {
                        statisticCard(name = "Format", value = "Sitting")
                    }
                }
            }
        }
    }

    @Composable
    fun statisticCard(name: String, value: String) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text(text = name, style = MaterialTheme.typography.subtitle2)
            Spacer(modifier = Modifier.height(4.dp))
            Text(text = value, style = MaterialTheme.typography.subtitle1)
        }
    }

    @Composable
    @Preview(name = "Light Mode")
    @Preview(
        uiMode = Configuration.UI_MODE_NIGHT_YES, showBackground = true, name = "Dark Mode"
    )
    fun OverviewScreenPreview() {
        ApplicationTheme {
            Surface {
                OverviewScreen()
            }
        }
    }

    private fun setupBehavior() {
//        binding.buttonStart.setOnClickListener {
//            findNavController().navigateSafely(
//                R.id.action_overviewFragment_to_moveFragment,
//                bundleOf(
//                    EXTRA_KEY_INDEX_OF_MOVE to 0
//                )
//            )
//
//            AnalyticsManager.logEvent(MY_EVENT_START_EXERCISE_STRETCH)
//        }
//
//        binding.buttonBack.setOnClickListener {
//            activity?.finishAfterTransition()
//        }

//        (binding.imageBreathInOut.drawable as AnimationDrawable).start()
//        (binding.imageNeckRoll.drawable as AnimationDrawable).start()
//        (binding.imageShoulderRotation.drawable as AnimationDrawable).start()
//        (binding.imageWristRotation.drawable as AnimationDrawable).start()
//        (binding.imageLowBackStretch.drawable as AnimationDrawable).start()
//        (binding.imageFootPumps.drawable as AnimationDrawable).start()
//        (binding.imageAnkleRotation.drawable as AnimationDrawable).start()
//        (binding.imageHipKneeStretch.drawable as AnimationDrawable).start()
    }

    companion object {
        const val TAG = "OverviewFragment"
    }
}