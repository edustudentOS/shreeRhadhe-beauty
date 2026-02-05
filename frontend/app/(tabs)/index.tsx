import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  Linking,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { productsAPI, reviewsAPI, seedDataAPI } from '../../utils/api';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // First, seed data if needed
      await seedDataAPI.seed();
      
      const [productsRes, reviewsRes] = await Promise.all([
        productsAPI.getAll(undefined, true),
        reviewsAPI.getAll(true),
      ]);
      setFeaturedProducts(productsRes.data.slice(0, 4));
      setReviews(reviewsRes.data.slice(0, 3));
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const openWhatsApp = () => {
    Linking.openURL('https://wa.me/919876543210');
  };

  const callNow = () => {
    Linking.openURL('tel:+919876543210');
  };

  const openMap = () => {
    Linking.openURL('https://maps.google.com/?q=Bhopal+Madhya+Pradesh');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Shri Radhe Beauty & Gift Collection</Text>
          <Text style={styles.heroSubtitle}>Your Beauty, Our Passion</Text>
          <Text style={styles.heroDescription}>Premium cosmetics & gift items in Bhopal</Text>
          <TouchableOpacity style={styles.ctaButton} onPress={() => router.push('/booking')}>
            <Ionicons name="calendar" size={20} color="#FFF" />
            <Text style={styles.ctaButtonText}>Book Your Beauty Session</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Featured Products */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/products')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsScroll}>
          {featuredProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => router.push(`/product-detail?id=${product.id}`)}
            >
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
              <Text style={styles.productPrice}>₹{product.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Why Choose Us */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why Choose Us</Text>
        <View style={styles.featuresGrid}>
          <View style={styles.featureItem}>
            <Ionicons name="shield-checkmark" size={40} color="#D4AF37" />
            <Text style={styles.featureTitle}>Authentic Products</Text>
            <Text style={styles.featureText}>100% genuine cosmetics</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="people" size={40} color="#D4AF37" />
            <Text style={styles.featureTitle}>Expert Consultation</Text>
            <Text style={styles.featureText}>Professional makeup artists</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="gift" size={40} color="#D4AF37" />
            <Text style={styles.featureTitle}>Gift Collection</Text>
            <Text style={styles.featureText}>Perfect for every occasion</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="heart" size={40} color="#D4AF37" />
            <Text style={styles.featureTitle}>Customer Care</Text>
            <Text style={styles.featureText}>Dedicated support</Text>
          </View>
        </View>
      </View>

      {/* Customer Reviews */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Customer Reviews</Text>
          <TouchableOpacity onPress={() => router.push('/reviews')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewName}>{review.name}</Text>
              <View style={styles.rating}>
                {[...Array(5)].map((_, i) => (
                  <Ionicons
                    key={i}
                    name={i < review.rating ? 'star' : 'star-outline'}
                    size={16}
                    color="#D4AF37"
                  />
                ))}
              </View>
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))}
      </View>

      {/* Contact Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Get In Touch</Text>
        <View style={styles.contactButtons}>
          <TouchableOpacity style={styles.contactButton} onPress={openWhatsApp}>
            <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
            <Text style={styles.contactButtonText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton} onPress={callNow}>
            <Ionicons name="call" size={24} color="#007AFF" />
            <Text style={styles.contactButtonText}>Call Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton} onPress={openMap}>
            <Ionicons name="location" size={24} color="#FF3B30" />
            <Text style={styles.contactButtonText}>Location</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Floating WhatsApp Button */}
      <TouchableOpacity style={styles.floatingWhatsApp} onPress={openWhatsApp}>
        <Ionicons name="logo-whatsapp" size={32} color="#FFF" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  hero: {
    backgroundColor: '#FFE5EC',
    padding: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#D4AF37',
    fontWeight: '600',
    marginBottom: 4,
  },
  heroDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: '#D4AF37',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    gap: 8,
  },
  ctaButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    padding: 16,
    backgroundColor: '#FFF',
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllText: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: '600',
  },
  productsScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  productCard: {
    width: 140,
    marginRight: 12,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    minHeight: 36,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginTop: 4,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureItem: {
    width: (width - 48) / 2,
    backgroundColor: '#FFE5EC',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  reviewCard: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  rating: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewComment: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  contactButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  contactButton: {
    alignItems: 'center',
    padding: 12,
  },
  contactButtonText: {
    fontSize: 12,
    color: '#333',
    marginTop: 8,
    fontWeight: '600',
  },
  floatingWhatsApp: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
});
