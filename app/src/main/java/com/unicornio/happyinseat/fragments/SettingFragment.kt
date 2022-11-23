package com.unicornio.happyinseat.fragments

import android.content.ActivityNotFoundException
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.unicornio.happyinseat.databinding.FragmentSettingBinding
import com.unicornio.happyinseat.deleteRecords
import com.unicornio.toolish.utils.Utils.shotToast

class SettingFragment : Fragment() {
    private var _binding: FragmentSettingBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentSettingBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        Log.d(TAG, "onViewCreated")

        setupBehavior(view)
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    private fun setupBehavior(root: View) {
        binding.buttonRemove.setOnClickListener {
            MaterialAlertDialogBuilder(it.context)
                .setTitle("Are you sure?")
                .setPositiveButton("Yes") { _, _ ->
                    deleteRecords(it.context)
                    it.context.shotToast("All records are removed")
                }
                .setNegativeButton("No") { dialog, _ -> dialog.cancel() }
                .show()
        }

        binding.buttonRate.setOnClickListener {
            rateApp()
        }
    }

    private fun rateApp() {
        fun rateIntentForUrl(url: String): Intent {
            val packageName = requireContext().packageName
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(String.format("%s?id=%s", url, packageName)))
            val flags = Intent.FLAG_ACTIVITY_NO_HISTORY or Intent.FLAG_ACTIVITY_MULTIPLE_TASK or Intent.FLAG_ACTIVITY_NEW_DOCUMENT
            intent.addFlags(flags)
            return intent
        }

        try {
            val rateIntent = rateIntentForUrl("market://details")
            startActivity(rateIntent)
        } catch (e: ActivityNotFoundException) {
            val rateIntent = rateIntentForUrl("https://play.google.com/store/apps/details")
            startActivity(rateIntent)
        }
    }

    companion object {
        const val TAG = "SettingFragment"
    }
}