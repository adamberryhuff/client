import { compose } from 'recompose';
import { withCall, withData } from 'spunky';

import GetBalance from './GetBalance';
import authActions from '../../../../actions/authActions';
import balancesActions from '../../../../actions/balancesActions';
import withNetworkData from '../../../../hocs/withNetworkData';
import withNullLoader from '../../../../hocs/dapps/withNullLoader';
import withRejectMessage from '../../../../hocs/dapps/withRejectMessage';

const mapAuthDataToProps = ({ address }) => ({ address });
const mapBalancesDataToProps = (balances) => ({ balances });

export default function makeGetBalance() {
  return compose(
    // Get the current network & account address
    withNetworkData(),
    withData(authActions, mapAuthDataToProps),

    // Get the balance & wait for success or failure
    withCall(balancesActions, ({ net, address }) => ({ net, address })),
    withNullLoader(balancesActions),
    withRejectMessage(balancesActions, 'Your account balance could not be retrieved.'),
    withData(balancesActions, mapBalancesDataToProps)
  )(GetBalance);
}
