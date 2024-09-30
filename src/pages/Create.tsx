import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonTextarea,
  IonButton,
  IonButtons,
  IonBackButton,
} from "@ionic/react";

// Interfaces for content types
interface Video {
  title: string;
  url: string;
  description: string;
}

interface Blog {
  title: string;
  content: string;
  author: string;
}

interface Advertisement {
  title: string;
  product: string;
  budget: number;
}

// Component
const Create: React.FC = () => {
  const [contentType, setContentType] = useState<string>("Video");
  const [contentData, setContentData] = useState<
    Video | Blog | Advertisement | any
  >({});

  // Handle form input changes
  const handleInputChange = (e: any, key: string) => {
    setContentData({
      ...contentData,
      [key]: e.detail.value,
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Content Created:", contentData);
    // Add logic to save content here
  };

  // Render fields based on content type
  const renderFields = () => {
    switch (contentType) {
      case "Video":
        return (
          <>
            <IonItem>
              <IonLabel position="stacked">Title</IonLabel>
              <IonInput onIonChange={(e) => handleInputChange(e, "title")} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">URL</IonLabel>
              <IonInput onIonChange={(e) => handleInputChange(e, "url")} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Description</IonLabel>
              <IonTextarea
                onIonChange={(e) => handleInputChange(e, "description")}
              />
            </IonItem>
          </>
        );
      case "Blog":
        return (
          <>
            <IonItem>
              <IonLabel position="stacked">Title</IonLabel>
              <IonInput onIonChange={(e) => handleInputChange(e, "title")} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Content</IonLabel>
              <IonTextarea
                onIonChange={(e) => handleInputChange(e, "content")}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Author</IonLabel>
              <IonInput onIonChange={(e) => handleInputChange(e, "author")} />
            </IonItem>
          </>
        );
      case "Advertisement":
        return (
          <>
            <IonItem>
              <IonLabel position="stacked">Title</IonLabel>
              <IonInput onIonChange={(e) => handleInputChange(e, "title")} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Product</IonLabel>
              <IonInput onIonChange={(e) => handleInputChange(e, "product")} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Budget</IonLabel>
              <IonInput
                type="number"
                onIonChange={(e) => handleInputChange(e, "budget")}
              />
            </IonItem>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Create Content</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel>Content Type</IonLabel>
          <IonSelect
            value={contentType}
            placeholder="Select One"
            onIonChange={(e) => setContentType(e.detail.value)}
          >
            <IonSelectOption value="Video">Video</IonSelectOption>
            <IonSelectOption value="Blog">Blog</IonSelectOption>
            <IonSelectOption value="Advertisement">
              Advertisement
            </IonSelectOption>
          </IonSelect>
        </IonItem>

        {renderFields()}

        <IonButton expand="block" onClick={handleSubmit}>
          Create
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Create;
