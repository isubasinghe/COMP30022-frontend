/*
 * Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

export const Container = {};
export const FormContainer = { fontFamily: 'impact' };
export const FormSection = {
  fontFamily: 'impact',
  textAlign: 'left',
  fontSize: '24px',
  color: '#1A535C',
  boxShadow: '5px 5px 5px gray',
  backgroundColor: '#f7fff7',
  borderRadius: '25px',
  padding: '50px',
  minWidth: '40%',
  margin: '50px'
};
export const FormField = { fontFamily: 'impact' };
export const SectionHeader = {
  textAlign: 'left',
  padding: '10px 10px 15px',
  color: '#1A535C',
  fontFamily: 'impact',
  fontSize: '48px'
};
export const SectionBody = { fontFamily: 'impact' };
export const SectionFooter = {
  fontFamily: 'sans-serif',
  fontSize: '16px',
  color: '#1A535C'
};
export const SectionFooterPrimaryContent = { fontFamily: 'impact' };
export const SectionFooterSecondaryContent = { fontFamily: 'sans-serif' };
export const Input = {
  textAlign: 'left',
  padding: '15px',
  fontFamily: 'sans-serif',
  fontSize: '16px',
  color: '#1A535C',
  backgroundColor: 'white',
  boxShadow: '5px 5px 5px gray',
  borderRadius: '15px'
};
export const Button = {
  textAlign: 'center',
  fontFamily: 'impact',
  fontSize: '20px',
  color: 'white',
  textTransform: 'uppercase',
  borderRadius: '15px',
  boxShadow: '5px 5px 5px gray',
  backgroundColor: '#FF6B6B',
  borderStyle: 'outset',
  borderColor: 'buttonface'
};
export const PhotoPickerButton = { fontFamily: 'impact' };
export const PhotoPlaceholder = { fontFamily: 'impact' };
export const SignInButton = { fontFamily: 'impact' };
export const SignInButtonIcon = { fontFamily: 'impact' };
export const SignInButtonContent = { fontFamily: 'impact' };
export const Strike = { fontFamily: 'impact' };
export const StrikeContent = { fontFamily: 'impact' };
export const ActionRow = { fontFamily: 'impact' };
export const FormRow = { fontFamily: 'impact' };
export const A = {
  fontFamily: 'sans-serif',
  fontSize: '16px',
  color: '#FF6B6B'
};
export const Hint = {
  fontFamily: 'sans-serif',
  fontSize: '16px',
  color: '#1A535C'
};
export const Radio = { fontFamily: 'impact' };
export const Label = { fontFamily: 'impact' };
export const InputLabel = {
  textAlign: 'left',
  color: '#1A535C',
  fontFamily: 'sans-serif',
  font: 'bold',
  fontSize: '16px'
};
export const AmazonSignInButton = { fontFamily: 'impact' };
export const FacebookSignInButton = { fontFamily: 'impact' };
export const GoogleSignInButton = { fontFamily: 'impact' };
export const OAuthSignInButton = { fontFamily: 'impact' };
export const Toast = {
  backgroundColor: '#4ecdc4',
  fontFamily: 'impact',
  color: '#f7fff7'
};

export const NavBar = { fontFamily: 'impact' };
export const NavRight = { fontFamily: 'impact' };
export const Nav = { fontFamily: 'impact' };
export const NavItem = { fontFamily: 'impact' };
export const NavButton = { fontFamily: 'impact' };

const AuthTheme = {
  container: Container,
  formContainer: FormContainer,
  formSection: FormSection,
  formField: FormField,

  sectionHeader: SectionHeader,
  sectionBody: SectionBody,
  sectionFooter: SectionFooter,
  sectionFooterPrimaryContent: SectionFooterPrimaryContent,
  sectionFooterSecondaryContent: SectionFooterSecondaryContent,

  input: Input,
  button: Button,
  photoPickerButton: PhotoPickerButton,
  photoPlaceholder: PhotoPlaceholder,
  signInButton: SignInButton,
  signInButtonIcon: SignInButtonIcon,
  signInButtonContent: SignInButtonContent,
  amazonSignInButton: AmazonSignInButton,
  facebookSignInButton: FacebookSignInButton,
  googleSignInButton: GoogleSignInButton,
  oAuthSignInButton: OAuthSignInButton,

  formRow: FormRow,
  strike: Strike,
  strikeContent: StrikeContent,
  actionRow: ActionRow,
  a: A,

  hint: Hint,
  radio: Radio,
  label: Label,
  inputLabel: InputLabel,
  toast: Toast,

  navBar: NavBar,
  nav: Nav,
  navRight: NavRight,
  navItem: NavItem,
  navButton: NavButton
};

export default AuthTheme;
