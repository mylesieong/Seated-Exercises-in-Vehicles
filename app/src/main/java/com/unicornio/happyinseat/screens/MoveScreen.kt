package com.unicornio.happyinseat.screens

import android.content.Context
import android.content.res.Configuration
import android.graphics.drawable.AnimationDrawable
import android.widget.ImageView
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Alignment.Companion.BottomCenter
import androidx.compose.ui.Alignment.Companion.Center
import androidx.compose.ui.Alignment.Companion.CenterVertically
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.LocalView
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import com.unicornio.happyinseat.*
import com.unicornio.happyinseat.R
import com.unicornio.happyinseat.model.Exercise
import com.unicornio.happyinseat.ui.theme.ApplicationTheme

@Composable
fun MoveScreen(moveIndex: Int?, onExit: () -> Unit, onNavigateToMove: (Int) -> Unit, onNavigateToFinish: () -> Unit) {
    //TODO add dynamic exercise when there is more types
    Box(modifier = Modifier.fillMaxSize()) {
        MoveInformation(
            moveIndex ?: 0,
            com.unicornio.happyinseat.model.STANDARD_STRETCH,
            onExit
        )

        MoveControl(
            moveIndex ?: 0,
            com.unicornio.happyinseat.model.STANDARD_STRETCH,
            Modifier.align(BottomCenter),
            onNavigateToMove,
            onNavigateToFinish
        )
    }
}

@Composable
fun MoveInformation(index: Int, exercise: com.unicornio.happyinseat.model.Exercise, onExit: () -> Unit) {
    val context = LocalView.current.context
    val move = exercise.moves[index]
    var isExpanded by remember { mutableStateOf(false) }

    val openDialog = remember { mutableStateOf(false) }

    if (openDialog.value) {
        ComposeAlertDialog(
            title = "Exit",
            description = "Leave current exercise",
            onPositive = {
                onExit.invoke()
                openDialog.value = false
            },
            onNegative = {
                openDialog.value = false
            },
            onDismiss = {
                openDialog.value = false
            })
    }

    Column {
        Box(modifier = Modifier.fillMaxWidth()) {
            Image(
                painter = painterResource(id = R.drawable.ic_baseline_arrow_back_24), contentDescription = null, modifier = Modifier
                    .height(56.dp)
                    .width(56.dp)
                    .padding(16.dp)
                    .clickable { openDialog.value = true }
            )
            Row(
                modifier = Modifier
                    .align(Alignment.CenterEnd)
                    .padding(16.dp)
            ) {
                Text(text = "${index + 1}", style = MaterialTheme.typography.caption, fontSize = 16.sp)
                Text(text = " of ", style = MaterialTheme.typography.subtitle1)
                Text(text = "${exercise.moves.size}", style = MaterialTheme.typography.subtitle1)
            }
        }

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(MaterialTheme.colors.surface)
        ) {

            AndroidView(
                modifier = Modifier
                    .wrapContentSize()
                    .padding(16.dp)
                    .align(Center),
                factory = {
                    ImageView(context).apply {
                        setImageResource(exercise.moves[index].illustrationId)
                        (drawable as AnimationDrawable).start()
                    }
                },
                update = {}
            )
        }

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(32.dp)
        ) {

            Text(text = move.description, style = MaterialTheme.typography.subtitle1)

            Spacer(modifier = Modifier.height(8.dp))

            Row(modifier = Modifier.clickable {
                isExpanded = !isExpanded
            }) {
                Text(text = move.name, style = MaterialTheme.typography.h4)
                Spacer(modifier = Modifier.width(8.dp))
                Image(
                    painter = painterResource(id = if (isExpanded) R.drawable.ic_baseline_unfold_less_24 else R.drawable.ic_baseline_unfold_more_24),
                    contentDescription = null,
                    modifier = Modifier
                        .align(CenterVertically)
                        .height(20.dp)
                        .width(20.dp)
                )
            }

            Spacer(modifier = Modifier.height(12.dp))

            LazyColumn {
                if (isExpanded) {
                    item {
                        Text(text = move.instruction, style = MaterialTheme.typography.body1)
                    }

                    item {
                        Spacer(modifier = Modifier.height(180.dp))
                    }
                }
            }
        }
    }
}

@Composable
fun MoveControl(index: Int, exercise: com.unicornio.happyinseat.model.Exercise, modifier: Modifier, onNavigateToMove: (Int) -> Unit, onNavigateToFinish: () -> Unit) {
    fun goToPreviousMove(index: Int) {
        if (index > 0) {
            onNavigateToMove.invoke(index - 1)
        }
    }

    fun goToNextMove(context: Context, index: Int, exercise: Exercise) {
        if (index == exercise.moves.size - 1) {
            saveExercise(context, System.currentTimeMillis(), exercise)
            onNavigateToFinish.invoke()

        } else {
            onNavigateToMove.invoke(index + 1)
        }
    }

    val context = LocalView.current.context

    Row(
        modifier = modifier
            .fillMaxWidth()
            .padding(48.dp), verticalAlignment = CenterVertically
    ) {
        Box(
            modifier = Modifier
                .height(80.dp)
                .weight(1f)
                .clip(CircleShape)
                .alpha(if (index == 0) 0.3f else 1f)
                .clickable {
                    goToPreviousMove(index)
                }
        ) {
            Image(
                painter = painterResource(id = R.drawable.ic_baseline_arrow_back_ios_24),
                contentDescription = null,
                modifier = Modifier.align(Center)
            )
        }

        Box(
            modifier = Modifier
                .width(80.dp)
                .height(80.dp)
                .clip(CircleShape)
                .background(MaterialTheme.colors.secondary)
                .clickable {
                    goToNextMove(context, index, exercise)
                }
        ) {
            Image(
                painter = painterResource(id = R.drawable.ic_baseline_check_24),
                contentDescription = null,
                modifier = Modifier.align(Center)
            )
        }

        Box(
            modifier = Modifier
                .height(80.dp)
                .weight(1f)
                .clip(CircleShape)
                .clickable {
                    goToNextMove(context, index, exercise)
                }
        ) {
            Image(
                painter = painterResource(id = R.drawable.ic_baseline_arrow_forward_ios_24),
                contentDescription = null,
                modifier = Modifier.align(Center)
            )
        }
    }
}

@Composable
@Preview(name = "Light Mode")
@Preview(
    uiMode = Configuration.UI_MODE_NIGHT_YES, showBackground = true, name = "Dark Mode"
)
fun MoveScreenPreview() {
    ApplicationTheme {
        MoveScreen(1, {}, {}, {})
    }
}
