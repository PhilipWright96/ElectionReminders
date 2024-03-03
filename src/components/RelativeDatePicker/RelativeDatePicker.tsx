import './RelativeDatePicker.css';
import { IonCard, IonCardContent, IonItem, IonInput } from '@ionic/react';
interface ContainerProps { }

const RelativeDatePicker: React.FC<ContainerProps> = () => {
    return (
        <IonCard>
            <IonCardContent>
                <div className="row">
                    <div className="col">
                        <IonItem>
                            <IonInput label="Minutes before Election" type="number" placeholder="0"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput label="Days before Election" type="number" placeholder="0"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput label="Months before Election" type="number" placeholder="0"></IonInput>
                        </IonItem>
                    </div>
                    <div className="col">
                        <IonItem>
                            <IonInput label="Hours before Election" type="number" placeholder="0"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput label="Weeks before Election" type="number" placeholder="0"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput label="Years before Election" type="number" placeholder="0"></IonInput>
                        </IonItem>
                    </div>
                </div>
            </IonCardContent>
        </IonCard>
    );
};

export default RelativeDatePicker;
