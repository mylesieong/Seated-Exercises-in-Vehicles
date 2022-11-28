package com.unicornio.happyinseat.fragments

import android.content.Context
import android.content.res.Configuration
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Alignment.Companion.BottomCenter
import androidx.compose.ui.Alignment.Companion.Center
import androidx.compose.ui.Alignment.Companion.CenterVertically
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.platform.LocalView
import androidx.compose.ui.platform.ViewCompositionStrategy
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.os.bundleOf
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.unicornio.happyinseat.*
import com.unicornio.happyinseat.R
import com.unicornio.happyinseat.helpers.navigateSafely
import com.unicornio.happyinseat.ui.theme.ApplicationTheme

class MoveFragment : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        return ComposeView(requireContext()).apply {
            setViewCompositionStrategy(ViewCompositionStrategy.DisposeOnViewTreeLifecycleDestroyed)
            setContent {
                ApplicationTheme {
                    Surface {
                        MoveScreen(getIndex(), getExercise())
                    }
                }
            }
        }
    }

    private fun getIndex(): Int {
        return arguments?.getInt(EXTRA_KEY_INDEX_OF_MOVE) ?: 0
    }

    private fun getExercise(): Exercise {
        return STANDARD_STRETCH   //TODO this is a hard code
    }

    @Composable
    fun MoveScreen(index: Int, exercise: Exercise) {
        Box(modifier = Modifier.fillMaxSize()) {
            MoveInformation(index, exercise)
            MoveControl(index, exercise, Modifier.align(BottomCenter))
        }
    }

    @Composable
    fun MoveInformation(index: Int, exercise: Exercise) {
        val context = LocalView.current.context
        val move = exercise.moves[index]
        var isExpanded by remember { mutableStateOf(false) }

        Column {
            Box(modifier = Modifier.fillMaxWidth()) {
                Image(
                    painter = painterResource(id = R.drawable.ic_baseline_arrow_back_24), contentDescription = null, modifier = Modifier
                        .height(56.dp)
                        .width(56.dp)
                        .padding(16.dp)
                        .clickable {
                            context.askUserWhetherQuit(positiveAction = { findNavController().navigateUp() }, negativeAction = {})
                        }
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
                    .background(Color.LightGray)
            ) {
                Image(
                    //TODO change to use move illustration
                    painter = painterResource(id = R.drawable.ic_baseline_insert_comment_24),
                    contentDescription = null,
                    modifier = Modifier
                        .height(164.dp)
                        .width(164.dp)
                        .padding(16.dp)
                        .align(Center)
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

                if (isExpanded) {
                    Text(text = move.instruction, style = MaterialTheme.typography.caption)
                }
            }
        }
    }

    @Composable
    fun MoveControl(index: Int, exercise: Exercise, modifier: Modifier) {
        val context = LocalView.current.context

        Row(
            modifier = modifier
                .fillMaxWidth()
                .padding(32.dp), verticalAlignment = CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .weight(1f)
                    .clickable {
                        goToPreviousMove(index)
                    }
                    .alpha(if (index == 0) 0.3f else 1f)
            ) {
                Image(painter = painterResource(id = R.drawable.ic_baseline_arrow_back_ios_24), contentDescription = null, modifier = Modifier.align(Center))
            }

            Box(
                modifier = Modifier
                    .width(64.dp)
                    .height(64.dp)
                    .clip(CircleShape)
                    .background(Color.Blue)
                    .clickable {
                        goToNextMove(context, index, exercise)
                    }
            ) {
                Image(painter = painterResource(id = R.drawable.ic_baseline_check_24), contentDescription = null, modifier = Modifier.align(Center))
            }

            Box(
                modifier = Modifier
                    .weight(1f)
                    .clickable {
                        goToNextMove(context, index, exercise)
                    }
            ) {
                Image(painter = painterResource(id = R.drawable.ic_baseline_arrow_forward_ios_24), contentDescription = null, modifier = Modifier.align(Center))
            }
        }
    }

    private fun goToPreviousMove(index: Int) {
        if (index > 0) {
            findNavController().navigateSafely(
                R.id.action_moveFragment_to_moveFragment, bundleOf(
                    EXTRA_KEY_INDEX_OF_MOVE to index - 1
                )
            )
        }
    }

    private fun goToNextMove(context: Context, index: Int, exercise: Exercise) {
        if (index == exercise.moves.size - 1) {
            saveRecord(context, Record(System.currentTimeMillis(), exercise))

            findNavController().navigateSafely(R.id.action_moveFragment_to_finishFragment)

        } else {
            findNavController().navigateSafely(
                R.id.action_moveFragment_to_moveFragment,
                bundleOf(EXTRA_KEY_INDEX_OF_MOVE to index + 1)
            )
        }
    }

    @Composable
    @Preview(name = "Light Mode")
    @Preview(
        uiMode = Configuration.UI_MODE_NIGHT_YES, showBackground = true, name = "Dark Mode"
    )
    fun MoveScreenPreview() {
        ApplicationTheme {
            Surface {
                MoveScreen(1, STANDARD_STRETCH)
            }
        }
    }

    override fun onResume() {
        super.onResume()
        activity?.setKeepScreenOn(true)
    }

    override fun onStop() {
        activity?.setKeepScreenOn(false)
        super.onStop()
    }

    companion object {
        const val TAG = "MoveFragment"

        const val EXTRA_KEY_EXERCISE = "EXTRA_KEY_EXERCISE"
        const val EXTRA_KEY_INDEX_OF_MOVE = "EXTRA_KEY_INDEX_OF_MOVE"
    }
}