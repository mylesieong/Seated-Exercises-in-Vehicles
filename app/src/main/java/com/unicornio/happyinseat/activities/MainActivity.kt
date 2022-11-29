package com.unicornio.happyinseat.activities

import android.os.Bundle
import android.view.MenuItem
import android.view.View
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.GravityCompat
import androidx.navigation.findNavController
import com.google.android.material.navigation.NavigationView
import com.unicornio.happyinseat.R
import com.unicornio.happyinseat.databinding.ActivityMainBinding
import com.unicornio.happyinseat.insertDummyRecordForDebugBuild

class MainActivity : AppCompatActivity(), NavigationView.OnNavigationItemSelectedListener {
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)

        setContentView(binding.root)

        setSupportActionBar(binding.toolbar)

        val toggle = ActionBarDrawerToggle(this, binding.drawerLayout, binding.toolbar, R.string.common_open_on_phone, R.string.common_open_on_phone)

        binding.drawerLayout.addDrawerListener(toggle)
        toggle.syncState()

        val navigationView = findViewById<View>(R.id.nav_view) as NavigationView
        navigationView.setNavigationItemSelectedListener(this)
        navigationView.setCheckedItem(R.id.menu_nav_home)

        findNavController(R.id.nav_host_fragment).addOnDestinationChangedListener { controller, destination, bundle ->
            navigationView.setCheckedItem(
                when (destination.label) {
                    "fragment_home" -> R.id.menu_nav_home
                    "fragment_history" -> R.id.menu_nav_history
                    "fragment_setting" -> R.id.menu_nav_setting
                    else -> R.id.menu_nav_home
                }
            )
        }

        insertDummyRecordForDebugBuild(this)
    }

    override fun onNavigationItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.menu_nav_home -> {
                findNavController(R.id.nav_host_fragment).navigate(R.id.action_homeFragment)
            }
            R.id.menu_nav_history -> {
                findNavController(R.id.nav_host_fragment).navigate(R.id.action_historyFragment)
            }
            R.id.menu_nav_setting -> {
                findNavController(R.id.nav_host_fragment).navigate(R.id.action_settingFragment)
            }
        }
        binding.drawerLayout.closeDrawer(GravityCompat.START)
        return true
    }
}