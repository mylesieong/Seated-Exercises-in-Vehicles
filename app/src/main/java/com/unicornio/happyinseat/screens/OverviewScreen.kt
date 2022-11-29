package com.unicornio.happyinseat.screens

import android.content.res.Configuration
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
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.unicornio.happyinseat.AnalyticsManager
import com.unicornio.happyinseat.AnalyticsManager.MY_EVENT_START_EXERCISE_STRETCH
import com.unicornio.happyinseat.R
import com.unicornio.happyinseat.STANDARD_STRETCH
import com.unicornio.happyinseat.ui.theme.ApplicationTheme

@Composable
fun OverviewScreen(onExit: () -> Unit, onNavigateToMove: () -> Unit) {

    fun startExercise() {
        onNavigateToMove.invoke()
        AnalyticsManager.logEvent(MY_EVENT_START_EXERCISE_STRETCH)
    }

    Box(modifier = Modifier.fillMaxSize()) {

        LazyColumn(modifier = Modifier.fillMaxSize()) {
            item {
                Header(onExit)
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
private fun Header(onExit: () -> Unit) {
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
                .clickable { onExit.invoke() },
            colorFilter = tint(Color.Black),
            painter = painterResource(id = R.drawable.ic_baseline_arrow_back_24),
            contentDescription = null
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
                    StatisticCard(name = "Moves", value = "6")
                }
                Box(modifier = Modifier.weight(1f), contentAlignment = Alignment.Center) {
                    StatisticCard(name = "Time", value = "10 mins")
                }
                Box(modifier = Modifier.weight(1f), contentAlignment = Alignment.Center) {
                    StatisticCard(name = "Format", value = "Sitting")
                }
            }
        }
    }
}

@Composable
fun StatisticCard(name: String, value: String) {
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
            OverviewScreen({}, {})
        }
    }
}