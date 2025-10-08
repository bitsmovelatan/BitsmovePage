import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { globalStyles, colors } from '../styles/globalStyles';

export default function StoriesScreen() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { isAuthenticated, API_URL, token } = useAuth();
  const { t, language } = useLanguage();

  useEffect(() => {
    loadStories();
  }, [language]);

  const loadStories = async () => {
    try {
      const response = await axios.get(`${API_URL}/stories`, {
        params: { language }
      });
      setStories(response.data.stories);
    } catch (err) {
      console.error('Error loading stories:', err);
    } finally {
      setLoading(false);
    }
  };

  const submitStory = async () => {
    if (!title || !content) {
      setError('Please fill in all fields');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(
        `${API_URL}/stories`,
        { title, content, isAnonymous, language },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess('Story shared successfully!');
      setTitle('');
      setContent('');
      setIsAnonymous(false);
      setStories([response.data.story, ...stories]);
      setTimeout(() => {
        setShowForm(false);
        setSuccess('');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to share story');
    } finally {
      setSubmitting(false);
    }
  };

  const likeStory = async (storyId, index) => {
    try {
      const response = await axios.put(`${API_URL}/stories/${storyId}/like`);
      const updatedStories = [...stories];
      updatedStories[index].likes = response.data.likes;
      setStories(updatedStories);
    } catch (err) {
      console.error('Error liking story:', err);
    }
  };

  if (loading) {
    return (
      <View style={[globalStyles.container, globalStyles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={globalStyles.container} contentContainerStyle={styles.content}>
      {isAuthenticated && (
        <TouchableOpacity
          style={[globalStyles.button, { margin: 20 }]}
          onPress={() => setShowForm(!showForm)}
        >
          <Text style={globalStyles.buttonText}>
            {showForm ? t('common.cancel') : t('stories.share')}
          </Text>
        </TouchableOpacity>
      )}

      {showForm && isAuthenticated && (
        <View style={[globalStyles.card, { margin: 20 }]}>
          {error ? (
            <View style={globalStyles.error}>
              <Text style={globalStyles.errorText}>{error}</Text>
            </View>
          ) : null}

          {success ? (
            <View style={globalStyles.success}>
              <Text style={globalStyles.successText}>{success}</Text>
            </View>
          ) : null}

          <Text style={globalStyles.label}>Title</Text>
          <TextInput
            style={globalStyles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Your story title"
            maxLength={200}
          />

          <Text style={globalStyles.label}>Content</Text>
          <TextInput
            style={[globalStyles.input, styles.textarea]}
            value={content}
            onChangeText={setContent}
            placeholder="Share your story..."
            multiline
            numberOfLines={6}
            maxLength={5000}
          />

          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setIsAnonymous(!isAnonymous)}
          >
            <View style={[styles.checkboxBox, isAnonymous && styles.checkboxChecked]}>
              {isAnonymous && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Post Anonymously</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[globalStyles.button, submitting && styles.buttonDisabled]}
            onPress={submitStory}
            disabled={submitting}
          >
            {submitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={globalStyles.buttonText}>{t('stories.submit')}</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.storiesList}>
        {stories.map((story, index) => (
          <View key={story._id} style={globalStyles.card}>
            <View style={styles.storyHeader}>
              <View style={[globalStyles.row, { flex: 1 }]}>
                <Text style={styles.authorIcon}>👤</Text>
                <Text style={styles.authorName}>{story.authorName}</Text>
              </View>
              <Text style={styles.storyDate}>
                {new Date(story.createdAt).toLocaleDateString()}
              </Text>
            </View>

            <Text style={styles.storyTitle}>{story.title}</Text>
            <Text style={styles.storyContent}>{story.content}</Text>

            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => likeStory(story._id, index)}
            >
              <Text style={styles.likeText}>❤️ {story.likes}</Text>
            </TouchableOpacity>
          </View>
        ))}

        {stories.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No stories yet. Be the first to share!</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 40,
  },
  textarea: {
    height: 120,
    textAlignVertical: 'top',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  storiesList: {
    padding: 20,
  },
  storyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  authorIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  storyDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
  },
  storyContent: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 12,
  },
  likeButton: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  likeText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

