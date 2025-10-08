import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { globalStyles, colors } from '../styles/globalStyles';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const { t, changeLanguage } = useLanguage();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    const result = await register(email, password, name, selectedLanguage);

    if (result.success) {
      await changeLanguage(selectedLanguage);
      navigation.replace('Dashboard');
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <ScrollView style={globalStyles.container} contentContainerStyle={globalStyles.scrollContainer}>
      <View style={styles.content}>
        <Text style={styles.icon}>🌸</Text>
        <Text style={globalStyles.heading}>{t('auth.register')}</Text>

        {error ? (
          <View style={globalStyles.error}>
            <Text style={globalStyles.errorText}>{error}</Text>
          </View>
        ) : null}

        <View style={styles.form}>
          <Text style={globalStyles.label}>{t('auth.name')}</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Jane Doe"
            value={name}
            onChangeText={setName}
            editable={!loading}
          />

          <Text style={globalStyles.label}>{t('auth.email')}</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="email@example.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
          />

          <Text style={globalStyles.label}>{t('auth.password')}</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
          />

          <Text style={globalStyles.label}>Language / Idioma</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(value) => setSelectedLanguage(value)}
              enabled={!loading}
            >
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Español" value="es" />
            </Picker>
          </View>

          <TouchableOpacity
            style={[globalStyles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={globalStyles.buttonText}>{t('auth.register')}</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{t('auth.haveAccount')} </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={globalStyles.link}>{t('auth.login')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  icon: {
    fontSize: 80,
    textAlign: 'center',
    marginBottom: 24,
  },
  form: {
    marginTop: 24,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: colors.bgPrimary,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});

