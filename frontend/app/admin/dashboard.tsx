import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { bookingsAPI, reviewsAPI, productsAPI } from '../../utils/api';

export default function AdminDashboardScreen() {
  const router = useRouter();
  const [stats, setStats] = useState({
    products: 0,
    bookings: 0,
    pendingBookings: 0,
    reviews: 0,
    pendingReviews: 0,
  });

  useEffect(() => {
    checkAuth();
    loadStats();
  }, []);

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem('adminToken');
    if (!token) {
      Alert.alert('Error', 'Please login first');
      router.replace('/admin/login' as any);
    }
  };

  const loadStats = async () => {
    try {
      const [productsRes, bookingsRes, reviewsRes] = await Promise.all([
        productsAPI.getAll(),
        bookingsAPI.getAll(),
        reviewsAPI.getAll(),
      ]);

      setStats({
        products: productsRes.data.length,
        bookings: bookingsRes.data.length,
        pendingBookings: bookingsRes.data.filter((b: any) => b.status === 'pending').length,
        reviews: reviewsRes.data.length,
        pendingReviews: reviewsRes.data.filter((r: any) => !r.approved).length,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('adminToken');
            router.replace('/admin/login' as any);
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Admin Dashboard</Text>
          <Text style={styles.headerSubtitle}>Manage your store</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={24} color="#F44336" />
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { backgroundColor: '#E3F2FD' }]}>
          <Ionicons name="cube" size={32} color="#2196F3" />
          <Text style={styles.statValue}>{stats.products}</Text>
          <Text style={styles.statLabel}>Products</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: '#FFF3E0' }]}>
          <Ionicons name="calendar" size={32} color="#FF9800" />
          <Text style={styles.statValue}>{stats.bookings}</Text>
          <Text style={styles.statLabel}>Bookings</Text>
          {stats.pendingBookings > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{stats.pendingBookings} pending</Text>
            </View>
          )}
        </View>

        <View style={[styles.statCard, { backgroundColor: '#F3E5F5' }]}>
          <Ionicons name="star" size={32} color="#9C27B0" />
          <Text style={styles.statValue}>{stats.reviews}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
          {stats.pendingReviews > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{stats.pendingReviews} pending</Text>
            </View>
          )}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <TouchableOpacity style={styles.actionCard}>
          <View style={styles.actionLeft}>
            <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="cube" size={24} color="#2196F3" />
            </View>
            <View>
              <Text style={styles.actionTitle}>Manage Products</Text>
              <Text style={styles.actionSubtitle}>Add, edit or delete products</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#CCC" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <View style={styles.actionLeft}>
            <View style={[styles.actionIcon, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="calendar" size={24} color="#FF9800" />
            </View>
            <View>
              <Text style={styles.actionTitle}>View Bookings</Text>
              <Text style={styles.actionSubtitle}>Manage appointment requests</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#CCC" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <View style={styles.actionLeft}>
            <View style={[styles.actionIcon, { backgroundColor: '#F3E5F5' }]}>
              <Ionicons name="star" size={24} color="#9C27B0" />
            </View>
            <View>
              <Text style={styles.actionTitle}>Moderate Reviews</Text>
              <Text style={styles.actionSubtitle}>Approve or reject reviews</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#CCC" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <View style={styles.actionLeft}>
            <View style={[styles.actionIcon, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="images" size={24} color="#4CAF50" />
            </View>
            <View>
              <Text style={styles.actionTitle}>Manage Gallery</Text>
              <Text style={styles.actionSubtitle}>Add or remove images</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#CCC" />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Admin Panel v1.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  logoutButton: {
    padding: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  badge: {
    backgroundColor: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  badgeText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 16,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
  },
});
