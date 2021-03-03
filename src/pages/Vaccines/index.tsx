import React, {useState, useEffect} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {PrimaryText, SecondaryText} from '../../styles';
import {Loading} from '../../components/';
import {
  Container,
  Card,
  CardVaccines,
  FooterCard,
  CardText,
  PageHeader,
} from './styles';
import api from './../../services/api';
interface RouteParams {
  labId: string;
  labName: string;
}
interface Vaccines {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

const Vaccines: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as RouteParams;
  const [selectedLab] = useState<string>(params.labId);
  const [labName] = useState<string>(params.labName);
  const [vaccines, setVaccines] = useState<Vaccines>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get(`/vaccines/${selectedLab}?page=1&display=20`).then((response) => {
      setVaccines(response.data.vaccines);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Container>
        <PageHeader>
          <SecondaryText
            textColor="#40CCB2"
            alignSelf="flex-start"
            fontSize={20}>
            Vacinas
          </SecondaryText>
        </PageHeader>
        <CardVaccines>
          {vaccines.map((vaccine) => (
            <Card
              key={vaccine.id}
              onPress={() =>
                navigation.navigate('VaccineAppointment', {
                  selectedVaccine: vaccine,
                  labId: selectedLab,
                  labName: labName,
                })
              }>
              <CardText>
                <PrimaryText textColor="black">{vaccine.name}</PrimaryText>
              </CardText>
              <FooterCard>
                <SecondaryText>Agendar</SecondaryText>
              </FooterCard>
            </Card>
          ))}
        </CardVaccines>
      </Container>
    </>
  );
};

export default Vaccines;
