package com.unicornio.happyinseat.fragments

import android.graphics.drawable.AnimationDrawable
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.os.bundleOf
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.unicornio.happyinseat.*
import com.unicornio.happyinseat.helpers.navigateSafely
import kotlinx.android.synthetic.main.fragment_move.*

class MoveFragment : Fragment() {

    private var exercise: Exercise = STANDARD_STRETCH
    private var index: Int = 0

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? = inflater.inflate(
        R.layout.fragment_move, container, false
    )

    override fun onResume() {
        super.onResume()
        activity?.setKeepScreenOn(true)
    }

    override fun onStop() {
        activity?.setKeepScreenOn(false)
        super.onStop()
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        Log.d(TAG, "onViewCreated")

        index = getIndexOfMoves(exercise)

        image_illustration.apply {
            setImageResource(exercise.moves[index].illustrationId)
            (drawable as AnimationDrawable).start()
        }

        text_index_of_move.text = (index + 1).toString()
        text_total_of_move.text = exercise.moves.size.toString()
        text_move_title.text = exercise.moves[index].name
        text_description.text = exercise.moves[index].description
        text_instruction.text = exercise.moves[index].instruction

        if (index == 0) {
            button_previous.alpha = 0.3f
            button_previous.isEnabled = false
        }

        setupBehavior(view)
    }

    private fun getIndexOfMoves(exercise: Exercise): Int {
        val i = arguments?.getInt(EXTRA_KEY_INDEX_OF_MOVE) ?: 0
        return if (i >= exercise.moves.size) exercise.moves.size - 1 else i
    }

    private fun setupBehavior(root: View) {
        button_back.setOnClickListener {
            it.context.askUserWhetherQuit(
                positiveAction = { findNavController().navigateUp() },
                negativeAction = {}
            )
        }

        text_move_title.setOnClickListener {
            if (button_expand_instruction.visibility == View.VISIBLE) {
                button_expand_instruction.visibility = View.GONE
                button_collapse_instruction.visibility = View.VISIBLE
                text_instruction.visibility = View.VISIBLE
            } else {
                button_expand_instruction.visibility = View.VISIBLE
                button_collapse_instruction.visibility = View.GONE
                text_instruction.visibility = View.GONE
            }
        }

        button_expand_instruction.setOnClickListener {
            button_expand_instruction.visibility = View.GONE
            button_collapse_instruction.visibility = View.VISIBLE
            text_instruction.visibility = View.VISIBLE
        }

        button_collapse_instruction.setOnClickListener {
            button_expand_instruction.visibility = View.VISIBLE
            button_collapse_instruction.visibility = View.GONE
            text_instruction.visibility = View.GONE
        }

        button_previous.setOnClickListener {
            if (index > 0) {
                findNavController().navigateSafely(
                    R.id.action_moveFragment_to_moveFragment,
                    bundleOf(
                        EXTRA_KEY_INDEX_OF_MOVE to index - 1
                    )
                )
            }
        }

        button_check.setOnClickListener {
            if (index == exercise.moves.size - 1) {
                findNavController().navigateSafely(R.id.action_moveFragment_to_finishFragment)

            } else {

                findNavController().navigateSafely(
                    R.id.action_moveFragment_to_moveFragment,
                    bundleOf(
                        EXTRA_KEY_INDEX_OF_MOVE to index + 1
                    )
                )
            }
        }

        button_next.setOnClickListener {
            if (index == exercise.moves.size - 1) {
                findNavController().navigateSafely(R.id.action_moveFragment_to_finishFragment)

            } else {

                findNavController().navigateSafely(
                    R.id.action_moveFragment_to_moveFragment,
                    bundleOf(
                        EXTRA_KEY_INDEX_OF_MOVE to index + 1
                    )
                )
            }
        }
    }

    companion object {
        const val TAG = "MoveFragment"

        const val EXTRA_KEY_EXERCISE = "EXTRA_KEY_EXERCISE"
        const val EXTRA_KEY_INDEX_OF_MOVE = "EXTRA_KEY_INDEX_OF_MOVE"
    }
}