import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="heart" size={48} color="#D4AF37" />
        <Text style={styles.headerTitle}>About Us</Text>
        <Text style={styles.headerSubtitle}>Your Beauty, Our Passion</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Story</Text>
          <Text style={styles.paragraph}>
            Shri Radhe Beauty & Gift Collection has been serving Bhopal with premium cosmetics and beauty services since our establishment. We take pride in offering 100% authentic products from trusted brands and personalized beauty consultations.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.paragraph}>
            To empower every individual with confidence through quality beauty products and professional services. We believe that everyone deserves to look and feel their best.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What We Offer</Text>
          <View style={styles.offerItem}>
            <Ionicons name="checkmark-circle" size={24} color="#D4AF37" />
            <Text style={styles.offerText}>Premium cosmetics from top brands</Text>
          </View>
          <View style={styles.offerItem}>
            <Ionicons name="checkmark-circle" size={24} color="#D4AF37" />
            <Text style={styles.offerText}>Professional makeup services</Text>
          </View>
          <View style={styles.offerItem}>
            <Ionicons name="checkmark-circle" size={24} color="#D4AF37" />
            <Text style={styles.offerText}>Bridal makeup packages</Text>
          </View>
          <View style={styles.offerItem}>
            <Ionicons name="checkmark-circle" size={24} color="#D4AF37" />
            <Text style={styles.offerText}>Skincare consultation</Text>
          </View>
          <View style={styles.offerItem}>
            <Ionicons name="checkmark-circle" size={24} color="#D4AF37" />
            <Text style={styles.offerText}>Gift hampers for all occasions</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Us</Text>
          <View style={styles.valueCard}>
            <Ionicons name="shield-checkmark" size={32} color="#D4AF37" />
            <Text style={styles.valueTitle}>Authenticity Guaranteed</Text>
            <Text style={styles.valueText}>All products are 100% genuine and sourced directly from authorized distributors.</Text>
          </View>
          <View style={styles.valueCard}>
            <Ionicons name="people" size={32} color="#D4AF37" />
            <Text style={styles.valueTitle}>Expert Team</Text>
            <Text style={styles.valueText}>Our certified makeup artists have years of experience in bridal and party makeup.</Text>
          </View>
          <View style={styles.valueCard}>
            <Ionicons name="heart" size={32} color="#D4AF37" />
            <Text style={styles.valueTitle}>Customer First</Text>
            <Text style={styles.valueText}>Your satisfaction is our priority. We provide personalized service to every customer.</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visit Us</Text>
          <Text style={styles.paragraph}>
            Come visit our store in Bhopal to explore our complete range of products and services. Our friendly staff is always ready to help you find the perfect products for your needs.
          </Text>
          <View style={styles.addressBox}>
            <Ionicons name="location" size={24} color="#D4AF37" />
            <View style={styles.addressText}>
              <Text style={styles.addressLine}>MP Nagar, Bhopal</Text>
              <Text style={styles.addressLine}>Madhya Pradesh 462001</Text>
            </View>
          </View>
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
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  offerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  offerText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  valueCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  valueTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
    marginBottom: 8,
  },
  valueText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  addressBox: {
    flexDirection: 'row',
    backgroundColor: '#FFE5EC',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    gap: 12,
  },
  addressText: {
    flex: 1,
  },
  addressLine: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
});
