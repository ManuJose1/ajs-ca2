import { View, Text, StyleSheet, Button } from 'react-native';
import LoginForm from '@/components/LoginForm';
import { useSession } from '@/contexts/AuthContext';

export default function Tab() {
const {session, signOut} = useSession();

  return (
    <View style={styles.container}>
      <Text>Tab Home</Text>
      {(session) ? (
         <Button
         onPress={signOut}
         title="LogOut"
         color="blue"
       />
      ) : (
        <LoginForm/>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
