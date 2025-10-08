import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { globalStyles, colors } from '../styles/globalStyles';

export default function HomeScreen({ navigation }) {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();

  return (
    <ScrollView style={globalStyles.container} contentContainerStyle={styles.content}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroIcon}>😄✨🎉</Text>
        <Text style={styles.heroTitle}>{t('home.title')}</Text>
        <Text style={styles.heroSubtitle}>{t('home.subtitle')}</Text>
        
        <View style={styles.heroButtons}>
          {!isAuthenticated ? (
            <>
              <TouchableOpacity
                style={globalStyles.button}
                onPress={() => navigation.navigate('Register')}
              >
                <Text style={globalStyles.buttonText}>{t('home.getStarted')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[globalStyles.button, globalStyles.buttonSecondary]}
                onPress={() => navigation.navigate('Stories')}
              >
                <Text style={[globalStyles.buttonText, globalStyles.buttonSecondaryText]}>
                  {t('home.learnMore')}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={globalStyles.button}
              onPress={() => navigation.navigate('Dashboard')}
            >
              <Text style={globalStyles.buttonText}>Go to Dashboard</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.features}>
        <View style={globalStyles.card}>
          <Text style={styles.featureIcon}>🤝</Text>
          <Text style={styles.featureTitle}>Community Support</Text>
          <Text style={styles.featureText}>
            Connect with others on similar journeys and share your experiences
          </Text>
        </View>

        <View style={globalStyles.card}>
          <Text style={styles.featureIcon}>🪙</Text>
          <Text style={styles.featureTitle}>Token Rewards</Text>
          <Text style={styles.featureText}>
            Receive FertilityTokens to help fund your path to parenthood
          </Text>
        </View>

        <View style={globalStyles.card}>
          <Text style={styles.featureIcon}>🔒</Text>
          <Text style={styles.featureTitle}>Blockchain Security</Text>
          <Text style={styles.featureText}>
            Built on Polygon for transparent and secure transactions
          </Text>
        </View>

        <View style={globalStyles.card}>
          <Text style={styles.featureIcon}>🌍</Text>
          <Text style={styles.featureTitle}>Global Reach</Text>
          <Text style={styles.featureText}>
            Available in multiple languages to serve women worldwide
          </Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Stories')}
        >
          <Text style={styles.actionIcon}>📖</Text>
          <Text style={styles.actionText}>Read Stories</Text>
        </TouchableOpacity>

        {isAuthenticated && (
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('ClaimTokens')}
          >
            <Text style={styles.actionIcon}>🎁</Text>
            <Text style={styles.actionText}>Claim Tokens</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 40,
  },
  hero: {
    backgroundColor: colors.primary,
    padding: 40,
    alignItems: 'center',
  },
  heroIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  heroButtons: {
    width: '100%',
    gap: 12,
  },
  features: {
    padding: 20,
  },
  featureIcon: {
    fontSize: 48,
    marginBottom: 12,
    textAlign: 'center',
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 16,
    justifyContent: 'center',
  },
  actionCard: {
    backgroundColor: colors.bgPrimary,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    minWidth: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});

