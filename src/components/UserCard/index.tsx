import { Button, Card, CardBody, CardFooter, CardHeader } from 'grommet';
import { Favorite, ShareOption } from 'grommet-icons';

export const UserCard: React.FC = () => {
  return (
    <Card height="small" width="small" background="light-1">
      <CardHeader pad="medium">Header</CardHeader>
      <CardBody pad="medium">Body</CardBody>
      <CardFooter pad={{ horizontal: 'small' }} background="light-2">
        <Button icon={<Favorite color="red" />} hoverIndicator />
        <Button icon={<ShareOption color="plain" />} hoverIndicator />
      </CardFooter>
    </Card>
  );
};
