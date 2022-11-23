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
import com.unicornio.happyinseat.databinding.FragmentMoveBinding
import com.unicornio.happyinseat.helpers.navigateSafely

class MoveFragment : Fragment() {

    private var exercise: Exercise = STANDARD_STRETCH
    private var index: Int = 0

    private var _binding: FragmentMoveBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentMoveBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

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

        binding.imageIllustration.apply {
            setImageResource(exercise.moves[index].illustrationId)
            (drawable as AnimationDrawable).start()
        }

        binding.textIndexOfMove.text = (index + 1).toString()
        binding.textTotalOfMove.text = exercise.moves.size.toString()
        binding.textMoveTitle.text = exercise.moves[index].name
        binding.textDescription.text = exercise.moves[index].description
        binding.textInstruction.text = exercise.moves[index].instruction

        if (index == 0) {
            binding.buttonPrevious.apply {
                alpha = 0.3f
                isEnabled = false
            }
        }

        setupBehavior(view)
    }

    private fun getIndexOfMoves(exercise: Exercise): Int {
        val i = arguments?.getInt(EXTRA_KEY_INDEX_OF_MOVE) ?: 0
        return if (i >= exercise.moves.size) exercise.moves.size - 1 else i
    }

    private fun setupBehavior(root: View) {
        binding.buttonBack.setOnClickListener {
            it.context.askUserWhetherQuit(
                positiveAction = { findNavController().navigateUp() },
                negativeAction = {}
            )
        }

        binding.textMoveTitle.setOnClickListener {
            if (binding.buttonExpandInstruction.visibility == View.VISIBLE) {
                binding.buttonExpandInstruction.visibility = View.GONE
                binding.buttonCollapseInstruction.visibility = View.VISIBLE
                binding.textInstruction.visibility = View.VISIBLE
            } else {
                binding.buttonExpandInstruction.visibility = View.VISIBLE
                binding.buttonCollapseInstruction.visibility = View.GONE
                binding.textInstruction.visibility = View.GONE
            }
        }

        binding.buttonExpandInstruction.setOnClickListener {
            binding.buttonExpandInstruction.visibility = View.GONE
            binding.buttonCollapseInstruction.visibility = View.VISIBLE
            binding.textInstruction.visibility = View.VISIBLE
        }

        binding.buttonExpandInstruction.setOnClickListener {
            binding.buttonExpandInstruction.visibility = View.VISIBLE
            binding.buttonCollapseInstruction.visibility = View.GONE
            binding.textInstruction.visibility = View.GONE
        }

        binding.buttonPrevious.setOnClickListener {
            if (index > 0) {
                findNavController().navigateSafely(
                    R.id.action_moveFragment_to_moveFragment,
                    bundleOf(
                        EXTRA_KEY_INDEX_OF_MOVE to index - 1
                    )
                )
            }
        }

        binding.buttonCheck.setOnClickListener {
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

        binding.buttonNext.setOnClickListener {
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