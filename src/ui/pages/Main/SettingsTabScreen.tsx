import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ADDRESS_TYPES, ATOM_NETWORK_TYPES, GITHUB_URL, NETWORK_TYPES } from '@/shared/constant';
import { Card, Column, Content, Footer, Header, Layout, Row, Text } from '@/ui/components';
import { Button } from '@/ui/components/Button';
import { Icon } from '@/ui/components/Icon';
import { NavTabBar } from '@/ui/components/NavTabBar';
import { useExtensionIsInTab, useOpenExtensionInTab } from '@/ui/features/browser/tabs';
import { getCurrentTab } from '@/ui/features/browser/tabs';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { useAtomNetworkType, useNetworkType, useVersionInfo } from '@/ui/state/settings/hooks';
import { fontSizes } from '@/ui/theme/font';
import { spacing } from '@/ui/theme/spacing';
import { useWallet } from '@/ui/utils';
import { RightOutlined } from '@ant-design/icons';
import { AtomNetworkType } from '@/shared/types';

interface Setting {
  label?: string;
  value?: string;
  desc?: string;
  danger?: boolean;
  action: string;
  route: string;
  right: boolean;
}

const SettingList: Setting[] = [
  // {
  //   label: 'Manage Wallet',
  //   value: '',
  //   desc: '',
  //   action: 'manage-wallet',
  //   route: '/settings/manage-wallet',
  //   right: true
  // },

  {
    label: 'Address Type',
    value: 'Taproot',
    desc: '',
    action: 'addressType',
    route: '/settings/address-type',
    right: true
  },

  {
    label: 'Connected Sites',
    value: '',
    desc: '',
    action: 'connected-sites',
    route: '/connected-sites',
    right: true
  },
  {
    label: 'Network',
    value: 'MAINNET',
    desc: '',
    action: 'networkType',
    route: '/settings/network-type',
    right: true
  },
  {
    label: 'Switch Endpoint',
    value: AtomNetworkType.ATOMICALS,
    desc: '',
    action: 'changeEndPoint',
    route: '/settings/end-point',
    right: true
  },
  {
    label: 'Advanced',
    value: 'For proficient users only',
    desc: 'For proficient users only',
    action: 'advanced',
    route: '/settings/advanced',
    right: true
  },
  {
    label: 'Change Password',
    value: 'Change your lockscreen password',
    desc: '',
    action: 'password',
    route: '/settings/password',
    right: true
  },
  {
    label: '',
    value: '',
    desc: 'Expand View ',
    action: 'expand-view',
    route: '/settings/export-privatekey',
    right: false
  },
  {
    label: '',
    value: '',
    desc: 'Lock Immediately',
    action: 'lock-wallet',
    route: '',
    right: false
  }
];

export default function SettingsTabScreen() {
  const navigate = useNavigate();

  const networkType = useNetworkType();
  const atomNetworkType = useAtomNetworkType();

  const isInTab = useExtensionIsInTab();

  const [connected, setConnected] = useState(false);

  const currentKeyring = useCurrentKeyring();
  const currentAccount = useCurrentAccount();
  const versionInfo = useVersionInfo();

  const wallet = useWallet();
  useEffect(() => {
    const run = async () => {
      const res = await getCurrentTab();
      if (!res) return;
      const site = await wallet.getCurrentConnectedSite(res.id);
      if (site) {
        setConnected(site.isConnected);
      }
    };
    run();
  }, []);

  const toRenderSettings = SettingList.filter((v) => {
    console.log(v, ATOM_NETWORK_TYPES)
    if (v.action == 'manage-wallet') {
      v.value = currentKeyring.alianName;
    }

    if (v.action == 'connected-sites') {
      v.value = connected ? 'Connected' : 'Not connected';
    }

    if (v.action == 'networkType') {
      v.value = NETWORK_TYPES[networkType].label;
    }

    // if (v.action == 'advanced') {
    //   v.value = NETWORK_TYPES[networkType].label;
    // }

    if (v.action == 'changeEndPoint') {
      v.value = ATOM_NETWORK_TYPES.filter(o => o.validNames.includes(networkType)).find(o => o.value === atomNetworkType)?.label || 'Custom';
    }

    if (v.action == 'addressType') {
      const item = ADDRESS_TYPES[currentKeyring.addressType];
      v.value = `${item.name} (${item.hdPath}/${currentAccount.index})`;
    }

    if (v.action == 'expand-view') {
      if (isInTab) {
        return false;
      }
    }

    return true;
  });

  const openExtensionInTab = useOpenExtensionInTab();

  return (
    <Layout>
      <Header />
      <Content>
        <Column>
          <div>
            {toRenderSettings.map((item) => {
              if (!item.label) {
                return (
                  <Button
                    key={item.action}
                    style={{ marginTop: spacing.small, height: 50 }}
                    text={item.desc}
                    onClick={(e) => {
                      if (item.action == 'expand-view') {
                        openExtensionInTab();
                        return;
                      }
                      if (item.action == 'lock-wallet') {
                        wallet.lockWallet();
                        navigate('/account/unlock');
                        return;
                      }
                      navigate(item.route);
                    }}
                  />
                );
              }
              return (
                <Card
                  key={item.action}
                  mt="lg"
                  onClick={(e) => {
                    if (item.action == 'expand-view') {
                      openExtensionInTab();
                      return;
                    }
                    navigate(item.route);
                  }}>
                  <Row full justifyBetween>
                    <Column justifyCenter>
                      <Text text={item.label || item.desc} preset="regular-bold" />
                      <Text text={item.value} preset="sub" />
                    </Column>

                    <Column justifyCenter>
                      {item.right && <RightOutlined style={{ transform: 'scale(1.2)', color: '#AAA' }} />}
                    </Column>
                  </Row>
                </Card>
              );
            })}
          </div>
          <Row justifyCenter gap="xl" mt="lg">
            {/* <Icon
              icon="discord"
              size={fontSizes.iconMiddle}
              color="textDim"
              onClick={() => {
                window.open(DISCORD_URL);
              }}
            />

            <Icon
              icon="twitter"
              size={fontSizes.iconMiddle}
              color="textDim"
              onClick={() => {
                window.open(TWITTER_URL);
              }}
            /> */}

            <Icon
              icon="github"
              size={fontSizes.iconMiddle}
              color="textDim"
              onClick={() => {
                window.open(GITHUB_URL);
              }}
            />
          </Row>
          <Text text={`Version: ${versionInfo.currentVesion}`} preset="sub" textCenter />
          {/* {versionInfo.currentVesion != versionInfo.newVersion && (
            <Text
              text={`New Version: ${versionInfo.newVersion}`}
              preset="link"
              color="red"
              textCenter
              onClick={() => {
                window.open(versionInfo.downloadUrl);
              }}
            />
          )} */}
        </Column>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="settings" />
      </Footer>
    </Layout>
  );
}
