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

export default function ContactScreen() {
  const openWhatsApp = () => {
    Linking.openURL('https://wa.me/919876543210');
  };

  const callNow = () => {
    Linking.openURL('tel:+919876543210');
  };

  const sendEmail = () => {
    Linking.openURL('mailto:info@shriradhebeauty.com');
  };

  const openMap = () => {
    Linking.openURL('https://maps.google.com/?q=Bhopal+Madhya+Pradesh');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="location" size={48} color="#D4AF37" />
        <Text style={styles.headerTitle}>Contact Us</Text>
        <Text style={styles.headerSubtitle}>We'd love to hear from you</Text>
      </View>

      {/* Contact Cards */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.contactCard} onPress={callNow}>
          <View style={styles.contactIconContainer}>
            <Ionicons name="call" size={28} color="#007AFF" />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Phone</Text>
            <Text style={styles.contactValue}>+91 98765-43210</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#CCC" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactCard} onPress={openWhatsApp}>
          <View style={styles.contactIconContainer}>
            <Ionicons name="logo-whatsapp" size={28} color="#25D366" />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>WhatsApp</Text>
            <Text style={styles.contactValue}>+91 98765-43210</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#CCC" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactCard} onPress={sendEmail}>
          <View style={styles.contactIconContainer}>
            <Ionicons name="mail" size={28} color="#FF3B30" />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Email</Text>
            <Text style={styles.contactValue}>info@shriradhebeauty.com</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#CCC" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactCard} onPress={openMap}>
          <View style={styles.contactIconContainer}>
            <Ionicons name="location" size={28} color="#FF9500" />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Address</Text>
            <Text style={styles.contactValue}>MP Nagar, Bhopal</Text>
            <Text style={styles.contactValue}>Madhya Pradesh 462001</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#CCC" />
        </TouchableOpacity>
      </View>

      {/* Business Hours */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Business Hours</Text>
        <View style={styles.hoursCard}>
          <View style={styles.hourRow}>
            <Text style={styles.dayText}>Monday - Saturday</Text>
            <Text style={styles.timeText}>10:00 AM - 8:00 PM</Text>
          </View>
          <View style={styles.hourRow}>
            <Text style={styles.dayText}>Sunday</Text>
            <Text style={styles.timeText}>11:00 AM - 6:00 PM</Text>
          </View>
        </View>
      </View>

      {/* Social Media */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Follow Us</Text>
        <View style={styles.socialButtons}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => Linking.openURL('https://instagram.com')}
          >
            <Ionicons name="logo-instagram" size={32} color="#E4405F" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => Linking.openURL('https://facebook.com')}
          >
            <Ionicons name="logo-facebook" size={32} color="#1877F2" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => Linking.openURL('https://twitter.com')}
          >
            <Ionicons name="logo-twitter" size={32} color="#1DA1F2" />
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#FFE5EC',
    padding: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
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
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  contactIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  hoursCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dayText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  timeText: {
    fontSize: 16,
    color: '#D4AF37',
    fontWeight: '600',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
