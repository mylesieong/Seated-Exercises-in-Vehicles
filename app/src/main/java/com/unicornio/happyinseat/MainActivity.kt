package com.unicornio.happyinseat

import android.os.Bundle
import android.view.MenuItem
import android.view.View
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.GravityCompat
import androidx.navigation.findNavController
import com.google.android.material.navigation.NavigationView
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity(), NavigationView.OnNavigationItemSelectedListener {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_main)

        setSupportActionBar(toolbar)

        val toggle = ActionBarDrawerToggle(this, drawer_layout, toolbar, R.string.common_open_on_phone, R.string.common_open_on_phone)

        drawer_layout.addDrawerListener(toggle)
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
        drawer_layout.closeDrawer(GravityCompat.START)
        return true
    }

}