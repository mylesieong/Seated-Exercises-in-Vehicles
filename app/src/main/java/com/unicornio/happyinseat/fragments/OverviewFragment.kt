package com.unicornio.happyinseat.fragments

import android.content.res.Configuration
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
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
import androidx.core.os.bundleOf
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.NavHostFragment.Companion.findNavController
import com.unicornio.happyinseat.AnalyticsManager
import com.unicornio.happyinseat.AnalyticsManager.MY_EVENT_START_EXERCISE_STRETCH
import com.unicornio.happyinseat.R
import com.unicornio.happyinseat.STANDARD_STRETCH
import com.unicornio.happyinseat.fragments.MoveFragment.Companion.EXTRA_KEY_INDEX_OF_MOVE
import com.unicornio.happyinseat.helpers.navigateSafely
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
        Box(modifier = Modifier.fillMaxSize()) {

            LazyColumn(modifier = Modifier.fillMaxSize()) {
                item {
                    Header()
                }

                STANDARD_STRETCH.moves.mapIndexed { i, move ->
                    item {
                        MoveListItem(seq = i + 1, name = move.name, description = move.description, resource = R.drawable.ic_baseline_insert_comment_24)
                    }
                }
            }

            Button(modifier = Modifier
                .align(Alignment.BottomCenter)
                .padding(32.dp),
                shape = RoundedCornerShape(50),
                colors = ButtonDefaults.buttonColors(backgroundColor = Color.Yellow),
                onClick = { startExercise() }) {
                Text(text = "Start", modifier = Modifier.padding(horizontal = 48.dp))
            }
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
                    .height(24.dp)
                    .clickable {
                        activity?.finishAfterTransition()
                    }, colorFilter = tint(Color.Black), painter = painterResource(id = R.drawable.ic_baseline_arrow_back_24), contentDescription = null
            )

            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text(
                    text = "In Seat/ Stretching", modifier = Modifier.padding(top = 24.dp), style = MaterialTheme.typography.h6
                )

                Text(
                    text = "When travel a long trip in a confined seat, stretching will help reduce neck pain and back pain, improve the blood circulation as long as lower the risk of DVT(Deep Vein Thrombosis).",
                    modifier = Modifier.padding(24.dp),
                    style = MaterialTheme.typography.caption
                )

                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(bottom = 24.dp)
                ) {
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
    fun MoveListItem(seq: Int, name: String, description: String, resource: Int) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Row(
                modifier = Modifier.weight(1f)
            ) {
                Text(text = seq.toString(), style = MaterialTheme.typography.caption)
                Spacer(modifier = Modifier.width(8.dp))

                Column {
                    Text(text = name, style = MaterialTheme.typography.subtitle1)
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(text = description, style = MaterialTheme.typography.caption)
                }
            }
            Image(
                painter = painterResource(id = resource), contentDescription = null, modifier = Modifier
                    .height(80.dp)
                    .width(80.dp)
            )
        }
    }

    @Composable
    @Preview(name = "Light Mode")
    @Preview(uiMode = Configuration.UI_MODE_NIGHT_YES, showBackground = true, name = "Dark Mode")
    fun OverviewScreenPreview() {
        ApplicationTheme {
            Surface {
                OverviewScreen()
            }
        }
    }

    private fun startExercise() {
        findNavController(this).navigateSafely(
            R.id.action_overviewFragment_to_moveFragment, bundleOf(
                EXTRA_KEY_INDEX_OF_MOVE to 0
            )
        )
        AnalyticsManager.logEvent(MY_EVENT_START_EXERCISE_STRETCH)
    }

    companion object {
        const val TAG = "OverviewFragment"
    }
}