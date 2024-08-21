import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonInput, IonButton, IonIcon, IonBackButton, useIonRouter } from '@ionic/react';
import React from 'react';
import { checkmarkDoneOutline } from 'ionicons/icons';

const Register: React.FC = () => {
    const router = useIonRouter();

    const doRegister = (event: any) => {
        event.preventDefault();
        console.log('doRegister');
        router.goBack();
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'success'} >
                <IonButton slot='start'>
                        <IonBackButton defaultHref='/' />
                    </IonButton>
                    <IonTitle>Create Account</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonCard>
                    <IonCardContent>
                        <form onSubmit={doRegister}>
                            <IonInput fill='outline' labelPlacement='floating' label='email' placeholder='youremail@domain.com'></IonInput>
                            <IonInput className='ion-margin-top' fill='outline' labelPlacement='floating' label='password' placeholder='yourpassword'></IonInput>
                            <IonButton type='submit' expand='block' className='ion-margin-top'>
                                Create My Account
                                <IonIcon icon={checkmarkDoneOutline} slot='end' />
                            </IonButton>
                        </form>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Register;