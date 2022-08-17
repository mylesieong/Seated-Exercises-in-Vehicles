package com.unicornio.happyinseat

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.os.bundleOf
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.unicornio.happyinseat.helpers.navigateSafely
import kotlinx.android.synthetic.main.fragment_move.*

class MoveFragment : Fragment() {

    private var exercise: Exercise = STANDARD_STRETCH
    private var index: Int = 0

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? = inflater.inflate(
        R.layout.fragment_move, container, false
    )

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        Log.d(TAG, "onViewCreated")

        index = getIndexOfMoves(exercise)

        text_move_title.text = exercise.moves[index].name
        text_description.text = exercise.moves[index].description
        text_instruction.text = exercise.moves[index].instruction

        setupBehavior(view)
    }

    private fun getIndexOfMoves(exercise: Exercise): Int {
        val i = arguments?.getInt(EXTRA_KEY_INDEX_OF_MOVE) ?: 0
        return if (i >= exercise.moves.size) exercise.moves.size - 1 else i
    }

    private fun setupBehavior(root: View) {
        button_back.setOnClickListener {
            //TODO add ask user dialog
            findNavController().navigateUp()
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
            findNavController().navigateSafely(
                R.id.action_moveFragment_to_moveFragment,
                bundleOf(
                    EXTRA_KEY_INDEX_OF_MOVE to 1
                )
            )
        }

        button_check.setOnClickListener {

        }

        button_next.setOnClickListener {
            findNavController().navigateSafely(R.id.action_moveFragment_to_finishFragment)
        }
    }

    companion object {
        const val TAG = "MoveFragment"

        const val EXTRA_KEY_EXERCISE = "EXTRA_KEY_EXERCISE"
        const val EXTRA_KEY_INDEX_OF_MOVE = "EXTRA_KEY_INDEX_OF_MOVE"
    }
}