import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function MoreScreen() {
  const router = useRouter();

  const menuItems = [
    {
      id: 'about',
      title: 'About Us',
      subtitle: 'Learn more about our story',
      icon: 'information-circle' as const,
      route: '/about',
    },
    {
      id: 'gallery',
      title: 'Gallery',
      subtitle: 'View our work portfolio',
      icon: 'images' as const,
      route: '/gallery',
    },
    {
      id: 'reviews',
      title: 'Customer Reviews',
      subtitle: 'What our customers say',
      icon: 'star' as const,
      route: '/reviews',
    },
    {
      id: 'contact',
      title: 'Contact Us',
      subtitle: 'Get in touch with us',
      icon: 'call' as const,
      route: '/contact',
    },
    {
      id: 'booking',
      title: 'Book Appointment',
      subtitle: 'Schedule your beauty session',
      icon: 'calendar' as const,
      route: '/booking',
    },
  ];

  const handlePress = (route: string) => {
    router.push(route as any);
  };

  const openWhatsApp = () => {
    Linking.openURL('https://wa.me/919876543210');
  };

  const callNow = () => {
    Linking.openURL('tel:+919876543210');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickActionButton} onPress={openWhatsApp}>
          <Ionicons name="logo-whatsapp" size={32} color="#25D366" />
          <Text style={styles.quickActionText}>WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionButton} onPress={callNow}>
          <Ionicons name="call" size={32} color="#007AFF" />
          <Text style={styles.quickActionText}>Call Now</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => handlePress(item.route)}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name={item.icon} size={24} color="#D4AF37" />
              </View>
              <View style={styles.menuItemText}>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
                <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Admin Section */}
      <View style={styles.adminSection}>
        <TouchableOpacity
          style={styles.adminButton}
          onPress={() => router.push('/admin/login' as any)}
        >
          <Ionicons name="lock-closed" size={20} color="#FFF" />
          <Text style={styles.adminButtonText}>Admin Login</Text>
        </TouchableOpacity>
      </View>

      {/* Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Shri Radhe Beauty & Gift Collection</Text>
        <Text style={styles.infoText}>Your trusted beauty partner in Bhopal</Text>
        <Text style={styles.infoText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  quickActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  menuSection: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFE5EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  adminSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  adminButton: {
    backgroundColor: '#333',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  adminButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  infoSection: {
    padding: 24,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    textAlign: 'center',
  },
});
